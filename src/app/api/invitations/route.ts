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
      SELECT 
        i.recipient, 
        i.email, 
        i.date_sent, 
        o.name AS organization_name, 
        o.location AS organization_location, 
        o.size AS organization_size, 
        o.industry AS organization_industry, 
        o.type AS organization_type, 
        u.first_name || ' ' || u.last_name AS contact_name, 
        u.email AS contact_email, 
        u.phone AS contact_phone
      FROM invitations i
      LEFT JOIN organizations o ON i.organization_id = o.id
      LEFT JOIN users u ON o.contact_person_id = u.id
      ORDER BY i.date_sent DESC
      LIMIT 10;
    `;
    const result = await client.query(query);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching invitations:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "An unexpected error occurred" }, { status: 500 });
  } finally {
    client.release();
  }
}
