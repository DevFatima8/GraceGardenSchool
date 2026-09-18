import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Protect admin dashboard routes
  if (path.startsWith('/ad/m/in/dashboard')) {
    const isAuth = request.cookies.get('admin_auth')?.value === 'true';
    if (!isAuth) {
      return NextResponse.redirect(new URL('/ad/m/in', request.url));
    }
  }

  // Redirect to dashboard if already logged in and visiting login page
  if (path === '/ad/m/in' || path === '/ad/m/in/') {
    const isAuth = request.cookies.get('admin_auth')?.value === 'true';
    if (isAuth) {
      return NextResponse.redirect(new URL('/ad/m/in/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ad/m/in/:path*'],
};
