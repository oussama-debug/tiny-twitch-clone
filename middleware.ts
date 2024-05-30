import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/streamer(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
    if (isProtectedRoute(req)) auth().protect();
  }
  //{ debug: process.env.NODE_ENV !== "production" }
);

export const config = {
  matcher: [
    "/((?!.+.[w]+$|_next).*)",
    "/(api|trpc)(.*)",
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
