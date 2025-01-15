import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);
  
  // Extract token from Authorization header
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  // Check for routes starting with "/admin" and validate the token
  if (url.pathname.startsWith("/admin") && token !== "dummy-token") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Allow other requests to proceed
  return NextResponse.next();
}

// Define which routes the middleware applies to
export const config = {
  matcher: ["/admin/:path*"], // Middleware applies to all "/admin" subroutes
};
