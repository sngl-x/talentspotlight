import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const organization_id = searchParams.get("organization_id");

  const query = `
    SELECT 
      i.id AS invitation_id, 
      i.recipient, 
      i.email, 
      i.date_sent, 
      o.name AS organization_name, 
      i.organization_id
    FROM 
      invitations i
    LEFT JOIN 
      organizations o ON i.organization_id = o.id
    WHERE 
      ($1::int IS NULL OR i.organization_id = $1)
  `;

  const queryValues: (number | null)[] = organization_id
    ? [parseInt(organization_id, 10)]
    : [null];

  try {
    const client = await pool.connect();
    const result = await client.query(query, queryValues);
    client.release();
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching filtered invitations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch filtered invitations" },
      { status: 500 }
    );
  }
}
