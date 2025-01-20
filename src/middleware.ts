import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Exkludera NextAuth endpoints från middleware
  if (url.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Skydda alla /admin och /api endpoints
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) {
    // Kontrollera giltig session-token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Om ingen token finns, omdirigera till login-sidan för admin eller blockera för API
    if (!token) {
      if (url.pathname.startsWith("/admin")) {
        url.pathname = "/auth/signin";
        return NextResponse.redirect(url);
      }

      // Blockera åtkomst för /api
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}
