import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ success: false, message: "Missing username or password" }, { status: 400 });
  }

  if (username !== ADMIN_USERNAME || !(await bcrypt.compare(password, ADMIN_PASSWORD))) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  // Simulate a session or token (implement proper session handling in production)
  return NextResponse.json({ success: true, token: "dummy-token" });
}
