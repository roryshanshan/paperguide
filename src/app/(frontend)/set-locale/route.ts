import { NextRequest, NextResponse } from 'next/server'

import { defaultSiteLocale, isSiteLocale, siteLocaleCookie } from '@/utilities/siteLocale'

export function GET(request: NextRequest) {
  const redirect = request.nextUrl.searchParams.get('redirect')
  const localeParam = request.nextUrl.searchParams.get('locale')
  const locale = isSiteLocale(localeParam) ? localeParam : defaultSiteLocale
  const safeRedirect = redirect && redirect.startsWith('/') ? redirect : '/'

  const response = NextResponse.redirect(new URL(safeRedirect, request.url))

  response.cookies.set(siteLocaleCookie, locale, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  })

  return response
}
