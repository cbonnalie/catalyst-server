import express from "express";
import cors from "cors";
import {
    testDB,
    initDB,
    getXEvents
} from "./database";

const app = express();
const clientURL = String(process.env.CLIENT_URL);
const localURL = String(process.env.LOCAL_URL);

app.use(cors({
    origin: [clientURL, localURL],
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// test API calls
app.get("/api", async (_, res) => {
    console.log("/api route hit");
    res.json({message: "API is working!"});
});

app.get("/initdb", async (_, res) => {
    try {
        const tables = await initDB();
        res.json({ success: true, tables });
    } catch (err) {
        console.error("Error in /initdb route:", err);
        res.status(500).json({ error: "Database initialization failed" });
    }
})

app.get("/testdb", async (_, res) => {
    try {
        const result = await testDB();
        res.json({ success: true, timestamp: result });
    } catch (err) {
        console.error("Error in /testdb route:", err);
        res.status(500).json({ error: "Database test failed" });
    }
})

// fetch x events from the db
app.get("/api/xEvents", async (req, res) => {
  const x = parseInt(req.query.x as string);
  try {
    const events = await getXEvents(x);
    if (events) {
      console.log("Events from database:", events);
      res.header("Content-Type", "application/json");
      res.json(events);
    } else {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));