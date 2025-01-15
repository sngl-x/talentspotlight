import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/login", "/sign-up", "/api/*"],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Matches all routes except those containing a period (.) or "_next".
    "/",
  ],
};
