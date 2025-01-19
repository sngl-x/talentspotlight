import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  const client = await pool.connect();

  try {
    const query = `
      SELECT id, name, location, size, industry, type
      FROM organizations
      ORDER BY id;
    `;

    const result = await client.query(query);

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch organizations" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
