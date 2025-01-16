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
      SELECT recipient, email, date_sent
      FROM invitations
      ORDER BY date_sent DESC
      LIMIT 10;
    `;
    const result = await client.query(query);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching invitations:", error);

    // Narrow the type of error to ensure `message` is accessible
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Handle non-Error objects
    return NextResponse.json({ success: false, error: "An unexpected error occurred" }, { status: 500 });
  } finally {
    client.release();
  }
}
