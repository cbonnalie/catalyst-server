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

export async function getXEvents(x: number): Promise<Event[] | undefined> {
    try {
        const res = await pool.query('SELECT * FROM events ORDER BY RANDOM() LIMIT $1', [x]);
        return res.rows;
    } catch (err) {
        console.error('Error fetching events', err);
        throw err;
    }
}