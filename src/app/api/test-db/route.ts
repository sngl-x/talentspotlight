import { currentUser } from "@clerk/nextjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ success: false, message: "User not authenticated" });
  }

  try {
    const client = await pool.connect();
    await client.query(
      "INSERT INTO users (clerk_user_id, email, created_at) VALUES ($1, $2, NOW()) ON CONFLICT (clerk_user_id) DO NOTHING",
      [user.id, user.emailAddresses[0]?.emailAddress]
    );
    client.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
