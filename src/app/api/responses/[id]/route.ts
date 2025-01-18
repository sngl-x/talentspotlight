import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const client = await pool.connect();

  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid ID parameter" },
        { status: 400 }
      );
    }

    const query = `
      SELECT *
      FROM responses
      WHERE invitation_id = $1;
    `;

    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Response not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });
  } catch (error: unknown) {
    // Explicitly asserting the error as an instance of Error
    if (error instanceof Error) {
      // Now safe to access `.message`
      console.error("Error fetching response data:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Handle case where error is not an instance of Error
    console.error("Error fetching response data: Unknown error");
    return NextResponse.json(
      { success: false, error: "An unknown error occurred." },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
