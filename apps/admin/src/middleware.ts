import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isApi = pathname.startsWith('/api/');
  const isAuthApi = pathname.startsWith('/api/auth/');
  const isLoginPage = pathname === '/login';

  // Allow auth API routes (login, logout, etc.)
  if (isAuthApi) {
    return NextResponse.next();
  }

  // Prevent logged in admins from accessing the login page
  if (isLoginPage && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      if (payload.role === 'admin') {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      // Invalid token, let them access login
    }
  }

  // Allow unauthenticated users to access the login page
  if (isLoginPage) {
    return NextResponse.next();
  }

  // Protect all other pages and API routes
  if (!token) {
    if (isApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    if (payload.role !== 'admin') {
      if (isApi) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
  } catch (error) {
    if (isApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
