import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
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

// define a type for the db connection
let db: Database | null = null;

// init db connection
export async function initializeDatabase(): Promise<void> {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  }
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error("Database does not exist. Call initializeDatabase() first");
  }
  return db;
}

export async function getFiveEvents(): Promise<Event[] | undefined> {
  return db?.all<Event[]>(
    `SELECT *
         FROM events
         ORDER BY RANDOM() LIMIT 5
        `,
  );
}

export async function getXEvents(x: number): Promise<Event[] | undefined> {
  return db?.all<Event[]>(
    `SELECT *
         FROM events
         ORDER BY RANDOM() LIMIT ?
        `,
    [x],
  );
}
