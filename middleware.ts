import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { getToken } from 'next-auth/jwt'

import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/routes'

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (nextUrl.pathname.includes("developer")){
        return Response.redirect(new URL('/dashboard/developer', nextUrl));
      }else{
        return Response.redirect(new URL('/dashboard/recruiter', nextUrl));
      }
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    if (nextUrl.pathname.includes('/recruiter')) {
      return Response.redirect(new URL('/auth/recruiter/login', nextUrl));
    }
    return Response.redirect(new URL('/auth/developer/login', nextUrl));
  }
  return;
});


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
}