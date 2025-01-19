import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// GET: Fetch a single organization by ID
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
      SELECT id, name, location, size, industry, type
      FROM organizations
      WHERE id = $1;
    `;

    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching organization data:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.error("Error fetching organization data: Unknown error");
    return NextResponse.json(
      { success: false, error: "An unknown error occurred." },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

// PUT: Update an organization's details
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const client = await pool.connect();

  try {
    const { id } = await context.params;
    const body = await req.json();
    const { location, size, industry, type } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid ID parameter" },
        { status: 400 }
      );
    }

    const validTypes = ["Non-profit", "Public", "Profit"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid value for 'type'" },
        { status: 400 }
      );
    }

    const sanitizedLocation = location === "" ? null : location;

    const query = `
      UPDATE organizations
      SET location = $1, size = $2, industry = $3, type = $4
      WHERE id = $5
      RETURNING *;
    `;

    const result = await client.query(query, [
      sanitizedLocation,
      size,
      industry,
      type,
      id,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating organization data:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.error("Error updating organization data: Unknown error");
    return NextResponse.json(
      { success: false, error: "An unknown error occurred." },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
