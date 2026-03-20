import { cookies } from 'next/headers'

export const siteLocaleCookie = 'site-locale'
export const siteLocales = ['zh', 'en'] as const
export const defaultSiteLocale = 'zh'

export type SiteLocale = (typeof siteLocales)[number]

export const isSiteLocale = (value: string | null | undefined): value is SiteLocale => {
  return Boolean(value && siteLocales.includes(value as SiteLocale))
}

export const getSiteLocale = async (): Promise<SiteLocale> => {
  const cookieStore = await cookies()
  const locale = cookieStore.get(siteLocaleCookie)?.value

  return isSiteLocale(locale) ? locale : defaultSiteLocale
}

export const getLocalizedLabel = (
  locale: SiteLocale,
  labels: Record<SiteLocale, string>,
): string => {
  return labels[locale]
}
