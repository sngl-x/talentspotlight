import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

export async function GET() {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    client.release();
    return NextResponse.json({ success: true, timestamp: res.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
