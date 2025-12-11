import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Force root path to default to Arabic, delegate the rest to next-intl
export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Handle root path
  if (pathname === "/") {
    const url = new URL(`/${routing.defaultLocale}`, request.url);
    return NextResponse.redirect(url);
  }

  // Skip middleware for static files, API routes, and non-locale paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Extract the potential locale from the pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const potentialLocale = pathSegments[0];

  // If the first segment is not a valid locale, redirect to default locale
  if (potentialLocale && !routing.locales.includes(potentialLocale)) {
    const url = new URL(`/${routing.defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

// Limit the middleware to paths that include the supported locales and exclude static assets
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|sitemap.xml|sitemap_index.xml|robots.txt|.*\\.txt).*)",
  ],
};
