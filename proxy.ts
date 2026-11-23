
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const username = process.env.DEMO_USERNAME;
  const password = process.env.DEMO_PASSWORD;

  if (!username || !password) {
    return new NextResponse('Demo login is not configured', {
      status: 503,
    });
  }

  const authorization = request.headers.get('authorization');

  if (authorization?.startsWith('Basic ')) {
    try {
      const decoded = atob(authorization.slice(6));
      const separator = decoded.indexOf(':');

      const suppliedUser = decoded.slice(0, separator);
      const suppliedPassword = decoded.slice(separator + 1);

      if (
        separator > 0 &&
        suppliedUser === username &&
        suppliedPassword === password
      ) {
        return NextResponse.next();
      }
    } catch {
      // Invalid authorization header.
    }
  }

  return new NextResponse('TAARA demo login required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="TAARA Round 3 Demo"',
    },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
