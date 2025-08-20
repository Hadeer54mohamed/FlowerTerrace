import createMiddleware from 'next-intl/middleware';
import {NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Force root path to default to Arabic, delegate the rest to next-intl
export default function middleware(request) {
  const {pathname} = request.nextUrl;

  if (pathname === '/') {
    const url = new URL(`/${routing.defaultLocale}`, request.url);
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

// Limit the middleware to paths that include the supported locales
export const config = {
  matcher: ['/', '/(en|ar)/:path*']
};
