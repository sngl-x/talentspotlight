import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const organization_id = searchParams.get("organization_id");

  // Explicitly type query values
  const queryParts: string[] = [];
  const queryValues: (string | number)[] = [];

  let query = `
    SELECT i.*, o.name AS organization_name
    FROM invitations i
    LEFT JOIN organizations o ON i.organization_id = o.id
  `;

  if (organization_id) {
    queryParts.push("i.organization_id = $1");
    queryValues.push(parseInt(organization_id, 10)); // Ensure type consistency
  }

  if (queryParts.length > 0) {
    query += " WHERE " + queryParts.join(" AND ");
  }

  try {
    const client = await pool.connect();
    const result = await client.query(query, queryValues);
    client.release();
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching filtered invitations:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch filtered invitations" }, { status: 500 });
  }
}
