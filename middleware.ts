import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  // publicRoutes: [
  //   '/',
  //   '/sign-in',
  //   '/sign-up',
  //   '/work/:path*',
  //   '/api/user/:path*',
  //   '/api/work/:path*',
  //   '/api/profile/:path*',
  //   '/api/edgestore/init'
  // ]
  publicRoutes: [
    '((?!^/account).*)',
    '((?!^/upload-new).*)',
    '((?!^/add-info).*)'
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
