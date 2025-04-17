import express from "express";
import cors from "cors";
import {
    testDB,
    initDB,
} from "./database";

const app = express();
app.use(cors());
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

// app.get("/db", async () => {
//   try {
//     const db = getDatabase();
//     console.log(db);
//     console.log("getDB succeeded");
//   } catch (err) {
//     console.log("Error fetching database", err);
//   }
// });
//
// app.get("/api/fiveEvents", async (req, res) => {
//   try {
//     const events = await getFiveEvents();
//     if (events) {
//       console.log("Events from database:", events);
//       res.header("Content-Type", "application/json");
//       res.json(events);
//     } else {
//       res.status(500).json({ error: "Failed to fetch events" });
//     }
//   } catch (err) {
//     console.error("Error fetching five events:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
//
// app.get("/api/xEvents", async (req, res) => {
//   const x = parseInt(req.query.x as string);
//   try {
//     const events = await getXEvents(x);
//     if (events) {
//       console.log("Events from database:", events);
//       res.header("Content-Type", "application/json");
//       res.json(events);
//     } else {
//       res.status(500).json({ error: "Failed to fetch events" });
//     }
//   } catch (err) {
//     console.error("Error fetching events:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));