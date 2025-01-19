import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const organization_id = url.searchParams.get("organization_id");
  const invitation_id = url.searchParams.get("invitation_id");
  const submitted_at = url.searchParams.get("submitted_at");

  let query = `
    SELECT
      r.invitation_id, r.q1, r.q2, r.q3, r.q4, r.q5, r.q6, r.q7, r.q8, r.q9, r.q10,
      r.q11, r.q12, r.q13, r.q14, r.q15, r.q16, r.q17, r.q18, r.q19, r.q20, r.q21,
      r.q22, r.q23, r.q24, r.q25, r.submitted_at
    FROM responses r
    INNER JOIN invitations i ON r.invitation_id = i.id
    WHERE 1=1
  `;

  const queryParams: (string | number)[] = [];
  let paramIndex = 1;

  // Add organization_id filter
  if (organization_id) {
    query += ` AND i.organization_id = $${paramIndex}`;
    queryParams.push(parseInt(organization_id, 10));
    paramIndex++;
  }

  // Add invitation_id filter
  if (invitation_id) {
    query += ` AND r.invitation_id = $${paramIndex}`;
    queryParams.push(parseInt(invitation_id, 10));
    paramIndex++;
  }

  // Add submitted_at filter
  if (submitted_at) {
    query += ` AND r.submitted_at::date = $${paramIndex}`;
    queryParams.push(submitted_at);
    paramIndex++;
  }

  try {
    const result = await pool.query(query, queryParams);

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching filtered responses:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch filtered responses" }, { status: 500 });
  }
}
