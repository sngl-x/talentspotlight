import { withClerkMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default withClerkMiddleware((req) => {
  const publicPaths = ["/", "/login(.*)", "/sign-up(.*)"];

  const isPublicPath = publicPaths.some((path) =>
    new RegExp(`^${path}$`).test(req.nextUrl.pathname)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  const url = new URL(req.url);
  url.pathname = "/login";
  return NextResponse.redirect(url);
});

export const config = {
  matcher: "/((?!_next|.*\\..*).*)",
};
