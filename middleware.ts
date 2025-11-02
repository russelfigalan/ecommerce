// import NextAuth from "next-auth";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
// import authConfig from "@/auth.config";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

// const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role; // Role from session (e.g., "USER" or "ADMIN")

  console.log("Middleware auth:", req.auth);

  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiAuthRoute = Array.isArray(apiAuthPrefix)
    ? apiAuthPrefix.some((prefix) => nextUrl.pathname.startsWith(prefix))
    : nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) => {
    if (route.endsWith("/*")) {
      const baseRoute = route.replace("/*", "");
      return nextUrl.pathname.startsWith(baseRoute);
    }
    return nextUrl.pathname === route;
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (!isLoggedIn) return NextResponse.next();

    return NextResponse.redirect(
      new URL(
        role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user",
        req.url
      )
    );

    // // If logged in and trying to access login/register, redirect by role
    // if (role === "ADMIN") {
    //   return Response.redirect(new URL("/dashboard/admin", req.url));
    // } else {
    //   return Response.redirect(new URL("/dashboard/user", req.url));
    // }
    // // if (isLoggedIn) {
    // //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    // // }
    // // return null;
  }

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.url));
  }

  // 4️⃣ Restrict access by role
  if (isLoggedIn) {
    // Prevent users from accessing admin dashboard
    if (nextUrl.pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    // Prevent admins from accessing user dashboard
    if (nextUrl.pathname.startsWith("/dashboard/user") && role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/api/auth/(.*)"],
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
