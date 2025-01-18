import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: Request) {
  const client = await pool.connect();

  try {
    const { invitationId, questionId, responseValue, q24 = [], q25 = [] } = await req.json();

    if (!invitationId) {
      return NextResponse.json({ success: false, message: "Missing invitation ID" }, { status: 400 });
    }

    // Ensure the row exists
    const insertQuery = `
      INSERT INTO responses (invitation_id)
      VALUES ($1)
      ON CONFLICT (invitation_id) DO NOTHING;
    `;
    await client.query(insertQuery, [invitationId]);

    // Update specific question
    if (questionId && typeof responseValue !== "undefined") {
      const updateQuery = `
        UPDATE responses
        SET q${questionId} = $1
        WHERE invitation_id = $2
        RETURNING *;
      `;
      const result = await client.query(updateQuery, [responseValue, invitationId]);

      if (result.rowCount === 0) {
        return NextResponse.json(
          { success: false, message: "No updates made for the specified question" },
          { status: 404 }
        );
      }
    }

    // Update q24
    if (q24.length > 0) {
      const updateQ24Query = `
        UPDATE responses
        SET q24 = $1
        WHERE invitation_id = $2
        RETURNING *;
      `;
      await client.query(updateQ24Query, [JSON.stringify(q24), invitationId]);
    }

    // Update q25
    if (q25.length > 0) {
      const updateQ25Query = `
        UPDATE responses
        SET q25 = $1
        WHERE invitation_id = $2
        RETURNING *;
      `;
      await client.query(updateQ25Query, [JSON.stringify(q25), invitationId]);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Error narrowing: Check if error is an instance of Error
    if (error instanceof Error) {
      console.error("Error updating responses:", error.message); // Safe access to .message
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Fallback for cases where error is not an instance of Error
    console.error("Error updating responses: Unknown error");
    return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function GET() {
  const client = await pool.connect();

  try {
    const query = `
      SELECT
        invitation_id,
        q1, q2, q3, q4, q5, q6, q7, q8, q9, q10,
        q11, q12, q13, q14, q15, q16, q17, q18,
        q19, q20, q21, q22, q23, q24, q25
      FROM responses
    `;

    const result = await client.query(query);
    const rows = result.rows;

    if (rows.length === 0) {
      return NextResponse.json({ success: true, data: [], message: "No responses found" });
    }

    return NextResponse.json({ success: true, data: rows });
  } catch (error: unknown) {
    // Error narrowing: Check if error is an instance of Error
    if (error instanceof Error) {
      console.error("Error fetching responses:", error.message); // Safe access to .message
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Fallback for cases where error is not an instance of Error
    console.error("Error fetching responses: Unknown error");
    return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
  } finally {
    client.release();
  }
}
