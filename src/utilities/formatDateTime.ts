import type { SiteLocale } from './siteLocale'

export const formatDateTime = (timestamp: string, locale: SiteLocale = 'en'): string => {
  const date = timestamp ? new Date(timestamp) : new Date()

  if (Number.isNaN(date.getTime())) return timestamp

  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const year = date.getFullYear()

  if (locale === 'zh') {
    return `${year}-${month}-${day}`
  }

  return `${month}/${day}/${year}`
}
