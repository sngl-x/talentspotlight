import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const query = `
      SELECT 
        o.id, 
        o.name, 
        o.size, 
        o.industry, 
        u.first_name || ' ' || u.last_name AS contact_person
      FROM 
        organizations o
      LEFT JOIN 
        users u 
      ON 
        o.contact_person_id = u.id
      ORDER BY 
        o.name;
    `;

    const result = await pool.query(query);

    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}
