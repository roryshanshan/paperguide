import { NextRequest, NextResponse } from 'next/server'

import { getConsultationDashboardCookieName } from '@/utilities/consultationDashboardAuth'

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/consultation-admin/login', request.url))

  response.cookies.set({
    expires: new Date(0),
    httpOnly: true,
    name: getConsultationDashboardCookieName(),
    path: '/',
    sameSite: 'lax',
    secure: true,
    value: '',
  })

  return response
}
