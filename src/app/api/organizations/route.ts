// /app/api/organizations/route.ts

import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const query = `SELECT id, name FROM organizations`; // Fetching id and name for the dropdown
    const result = await pool.query(query);

    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch organizations" }, { status: 500 });
  }
}
