import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Secret admin access entry points: render login on /mitali or /dharmesh directly
  if (pathname === '/mitali' || pathname === '/dharmesh') {
    const operator = pathname.replace('/', '');
    const response = NextResponse.next();
    response.cookies.set('md_admin_access', 'granted', {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });
    response.cookies.set('md_admin_operator', operator, {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });
    return response;
  }

  // Explicitly block /admin/login from any direct access (always disguise as 404)
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login')) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = '/not-found';
    return NextResponse.rewrite(notFoundUrl);
  }

  // Restrict direct access to /admin routes unless authorized via secret portal
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const accessCookie = request.cookies.get('md_admin_access');
    const isAuthorized = accessCookie?.value === 'granted';

    if (!isAuthorized) {
      // Rewrite to 404 Not Found to completely disguise admin routes
      const notFoundUrl = request.nextUrl.clone();
      notFoundUrl.pathname = '/not-found';
      return NextResponse.rewrite(notFoundUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mitali', '/dharmesh', '/admin', '/admin/:path*'],
};
