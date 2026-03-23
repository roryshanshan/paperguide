import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/admin' ||
    request.nextUrl.pathname.startsWith('/admin/')
  ) {
    return NextResponse.redirect(new URL('/consultation-admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
