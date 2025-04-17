import path from "path";

interface Event {
  event_type: string;
  description: string;
  percent_3months: number;
  percent_6months: number;
  percent_1year: number;
  percent_5years: number;
}

// absolute path to db
const dbPath = path.resolve(__dirname, "..", "databases", "events.db");

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err: any, res: { rows: any; }) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});


// define a type for the db connection
// let db: Database | null = null;
//
// // init db connection
// export async function initializeDatabase(): Promise<void> {
//   try {
//     db = await open({
//       filename: dbPath,
//       driver: sqlite3.Database,
//     });
//   } catch (err) {
//     console.error("Error initializing database:", err);
//     throw err;
//   }
// }
//
// export function getDatabase(): Database {
//   if (!db) {
//     throw new Error("Database does not exist. Call initializeDatabase() first");
//   }
//   return db;
// }
//
// export async function getFiveEvents(): Promise<Event[] | undefined> {
//   return db?.all<Event[]>(
//     `SELECT *
//          FROM events
//          ORDER BY RANDOM() LIMIT 5
//         `,
//   );
// }
//
// export async function getXEvents(x: number): Promise<Event[] | undefined> {
//   return db?.all<Event[]>(
//     `SELECT *
//          FROM events
//          ORDER BY RANDOM() LIMIT ?
//         `,
//     [x],
//   );
// }
