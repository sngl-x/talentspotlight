import { auth } from "@clerk/nextjs";

export async function GET() {
  const { userId } = auth();
  return new Response(JSON.stringify({ message: "Test DB connection successful", userId }));
}
