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
      return NextResponse.json(
        { success: false, message: "Missing invitation ID" },
        { status: 400 }
      );
    }

    if (questionId && typeof responseValue !== "undefined") {
      const query = `
        UPDATE responses
        SET q${questionId} = $1
        WHERE invitation_id = $2
        RETURNING *;
      `;
      const result = await client.query(query, [responseValue, invitationId]);

      if (result.rowCount === 0) {
        return NextResponse.json(
          { success: false, message: "Invitation not found or no updates made" },
          { status: 404 }
        );
      }
    }

    if (q24.length > 0) {
      const query = `
        UPDATE responses
        SET q24 = $1
        WHERE invitation_id = $2
        RETURNING *;
      `;
      await client.query(query, [JSON.stringify(q24), invitationId]);
    }

    if (q25.length > 0) {
      const query = `
        UPDATE responses
        SET q25 = $1
        WHERE invitation_id = $2
        RETURNING *;
      `;
      await client.query(query, [JSON.stringify(q25), invitationId]);
    }

    return NextResponse.json({ success: true });
   } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating responses:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json({ success: false, error: "An unexpected error occurred" }, { status: 500 });
    }
  } finally {
    client.release();
  }

}
