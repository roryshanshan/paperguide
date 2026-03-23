import 'server-only'

import crypto from 'node:crypto'

import { cookies } from 'next/headers'

const COOKIE_NAME = 'paperbridge_consultation_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14

type DashboardSession = {
  expiresAt: number
  username: string
}

const getDashboardSecret = () => {
  return process.env.CONSULTATION_DASHBOARD_SECRET || process.env.PAYLOAD_SECRET || ''
}

const getDashboardCredentials = () => {
  const username = process.env.CONSULTATION_DASHBOARD_USERNAME || ''
  const password = process.env.CONSULTATION_DASHBOARD_PASSWORD || ''

  if (!username || !password) {
    return null
  }

  return { password, username }
}

const signValue = (value: string) => {
  const secret = getDashboardSecret()

  if (!secret) {
    throw new Error('CONSULTATION_DASHBOARD_SECRET or PAYLOAD_SECRET is required.')
  }

  return crypto.createHmac('sha256', secret).update(value).digest('base64url')
}

const serializeSession = (session: DashboardSession) => {
  const payload = Buffer.from(JSON.stringify(session), 'utf8').toString('base64url')
  const signature = signValue(payload)

  return `${payload}.${signature}`
}

const parseSession = (value: string | undefined): DashboardSession | null => {
  if (!value) return null

  const [payload, signature] = value.split('.')

  if (!payload || !signature) return null
  if (signValue(payload) !== signature) return null

  const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as DashboardSession

  if (session.expiresAt <= Date.now()) {
    return null
  }

  return session
}

export const isConsultationDashboardConfigured = () => {
  return Boolean(getDashboardCredentials() && getDashboardSecret())
}

export const validateConsultationDashboardLogin = (username: string, password: string) => {
  const credentials = getDashboardCredentials()

  if (!credentials) return false

  return credentials.username === username && credentials.password === password
}

export const createConsultationDashboardSessionToken = (username: string) => {
  return serializeSession({
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    username,
  })
}

export const getConsultationDashboardSession = async () => {
  const cookieStore = await cookies()

  return parseSession(cookieStore.get(COOKIE_NAME)?.value)
}

export const getConsultationDashboardCookieName = () => COOKIE_NAME

export const getConsultationDashboardSessionMaxAge = () => SESSION_MAX_AGE_SECONDS
