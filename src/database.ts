interface Event {
  event_type: string;
  description: string;
  percent_3months: number;
  percent_6months: number;
  percent_1year: number;
  percent_5years: number;
}

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})

export async function initDB() {
    try {
        const res = await pool.query('SELECT table_schema,table_name FROM information_schema.tables;');
        console.log("Database tables:", res.rows);
        return res.rows;
    } catch (err) {
        console.error("Database initialization error:", err);
        throw err;
    }
}

export async function testDB() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connection successful:', res.rows[0]);
        return res.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

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
