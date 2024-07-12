import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

// Middleware to protect routes
export default clerkMiddleware((auth, req) => {
  const url = req.url;
  console.log(`Checking route: ${url}`);

  if (!isPublicRoute(req)) {
    console.log(`Route ${url} is protected. Checking authentication...`);
    auth().protect();
  } else {
    console.log(`Route ${url} is public.`);
  }
});

// Middleware configuration
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
