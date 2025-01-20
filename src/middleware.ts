import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.startsWith("/admin")) {
    // Check for a valid session token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no token, redirect to /auth/signin
    if (!token) {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
