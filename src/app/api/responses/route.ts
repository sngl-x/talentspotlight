import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: Request) {
  const client = await pool.connect();

  try {
    // Parse the raw request body
    const rawBody = await req.text();
    console.log("Raw Request Body:", rawBody);

    const { invitationId, questionId, responseValue, q24, q25 } = JSON.parse(rawBody);

    // Validate required fields
    if (!invitationId) {
      console.error("Missing invitationId in request payload");
      return NextResponse.json(
        { success: false, message: "Missing invitationId in request payload" },
        { status: 400 }
      );
    }

    if (!questionId && !responseValue && !q24 && !q25) {
      console.error("Missing response data in request payload");
      return NextResponse.json(
        { success: false, message: "Missing response data in request payload" },
        { status: 400 }
      );
    }

    let query, values;

    if (questionId && responseValue !== undefined) {
      // Single-choice question (q1 to q23)
      query = `
        UPDATE responses
        SET q${questionId} = $1
        WHERE invitation_id = $2
      `;
      values = [responseValue, invitationId];
    } else if (q24 || q25) {
      // Multi-choice questions (q24 or q25)
      const column = q24 ? "q24" : "q25";
      const responseData = q24 ? JSON.stringify(q24) : JSON.stringify(q25);

      query = `
        UPDATE responses
        SET ${column} = $1
        WHERE invitation_id = $2
      `;
      values = [responseData, invitationId];
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid request structure" },
        { status: 400 }
      );
    }

    // Execute the query
    await client.query(query, values);

    console.log(`Response saved: ${JSON.stringify({ query, values })}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving response:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    client.release();
  }
}
