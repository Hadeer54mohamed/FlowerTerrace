import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Export a default middleware function as required by Next.js
export default createMiddleware(routing);

// Limit the middleware to paths that include the supported locales
export const config = {
  matcher: ['/', '/(en|ar)/:path*']
};
