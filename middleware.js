import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Redirect legacy /ad/m/in/dashboard to /ad/m/in/pages/home
  if (path === '/ad/m/in/dashboard' || path === '/ad/m/in/dashboard/') {
    return NextResponse.redirect(new URL('/ad/m/in/pages/home', request.url));
  }

  // Protect admin routes (anything under /ad/m/in except the login page itself)
  if (path !== '/ad/m/in' && path !== '/ad/m/in/') {
    const isAuth = request.cookies.get('admin_auth')?.value === 'true';
    if (!isAuth) {
      return NextResponse.redirect(new URL('/ad/m/in', request.url));
    }
  }

  // Redirect to admin home if already logged in and visiting login page
  if (path === '/ad/m/in' || path === '/ad/m/in/') {
    const isAuth = request.cookies.get('admin_auth')?.value === 'true';
    if (isAuth) {
      return NextResponse.redirect(new URL('/ad/m/in/pages/home', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ad/m/in/:path*'],
};
