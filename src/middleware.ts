import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);

  // Exclude admin routes
  if (url.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Other middleware logic here
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to all "/admin" subroutes
};
