import canUseDOM from './canUseDOM'

const DEFAULT_LOCAL_URL = 'http://localhost:3000'
const DEFAULT_PRODUCTION_URL = 'https://paperguide.vercel.app'
const LOCAL_HOSTNAMES = new Set(['127.0.0.1', '0.0.0.0', 'localhost'])

const normalizeOrigin = (value?: string | null, allowLocal = false) => {
  if (!value) return null

  const trimmed = value.trim()

  if (!trimmed) return null

  const shouldUseHttp = /^(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(trimmed)
  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `${shouldUseHttp ? 'http' : 'https'}://${trimmed}`

  try {
    const normalized = new URL(candidate)

    if (!allowLocal && LOCAL_HOSTNAMES.has(normalized.hostname)) {
      return null
    }

    return normalized.origin
  } catch {
    return null
  }
}

const getProductionURL = () => {
  return (
    normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    normalizeOrigin(process.env.NEXT_PUBLIC_SERVER_URL) ||
    DEFAULT_PRODUCTION_URL
  )
}

export const getServerSideURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return getProductionURL()
  }

  return (
    normalizeOrigin(process.env.NEXT_PUBLIC_SERVER_URL, true) ||
    normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    DEFAULT_LOCAL_URL
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return (
    normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    normalizeOrigin(process.env.NEXT_PUBLIC_SERVER_URL, true) ||
    ''
  )
}
