import { NextRequest, NextResponse } from 'next/server'

import {
  createConsultationDashboardSessionToken,
  getConsultationDashboardCookieName,
  getConsultationDashboardSessionMaxAge,
  isConsultationDashboardConfigured,
  validateConsultationDashboardLogin,
} from '@/utilities/consultationDashboardAuth'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const username = typeof formData.get('username') === 'string' ? String(formData.get('username')).trim() : ''
  const password = typeof formData.get('password') === 'string' ? String(formData.get('password')) : ''

  if (!isConsultationDashboardConfigured()) {
    return NextResponse.redirect(new URL('/consultation-admin/login', request.url))
  }

  if (!validateConsultationDashboardLogin(username, password)) {
    return NextResponse.redirect(new URL('/consultation-admin/login?error=1', request.url))
  }

  const response = NextResponse.redirect(new URL('/consultation-admin', request.url))

  response.cookies.set({
    httpOnly: true,
    maxAge: getConsultationDashboardSessionMaxAge(),
    name: getConsultationDashboardCookieName(),
    path: '/',
    sameSite: 'lax',
    secure: true,
    value: createConsultationDashboardSessionToken(username),
  })

  return response
}
