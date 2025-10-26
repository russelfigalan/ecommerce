import NextAuth from "next-auth";
// import { auth } from "@/auth";
// import { NextResponse } from "next/server";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

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

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/api/auth/(.*)"],
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
