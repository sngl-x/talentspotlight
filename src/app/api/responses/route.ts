import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

export async function POST(req: Request) {
  try {
    const { userId, responses } = await req.json();

    const client = await pool.connect();

    const query = `
      INSERT INTO responses (user_id, question_id, response_value, submitted_at)
      VALUES ($1, $2, $3, NOW())
    `;

    const promises = responses.map(({ questionId, response_value }: { questionId: string; response_value: number }) =>
      client.query(query, [userId, questionId, response_value])
    );

    await Promise.all(promises);

    client.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving responses:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
