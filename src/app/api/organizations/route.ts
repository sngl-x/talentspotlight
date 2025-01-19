import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// POST: Add a new organization
export async function POST(req: Request) {
  const client = await pool.connect();

  try {
    const body = await req.json();
    const { name, location, size, industry, type } = body;

    // Validate input
    if (!name || !location || !size || !industry || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO organizations (name, location, size, industry, type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const result = await client.query(query, [name, location, size, industry, type]);

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error adding organization:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add organization" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// GET: Fetch all organizations (optional if already implemented)
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
