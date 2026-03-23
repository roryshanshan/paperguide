import 'server-only'

import crypto from 'node:crypto'

import configPromise from '@payload-config'
import { list, put } from '@vercel/blob'
import { getPayload } from 'payload'

import type { ConsultationRequest } from '@/payload-types'
import type { SiteLocale } from '@/utilities/siteLocale'

const CONSULTATION_BLOB_PREFIX = 'consultation-requests'
const MAX_INBOX_RECORDS = 200

export type ConsultationInboxRecord = {
  createdAt: string
  education: string
  id: string
  locale: SiteLocale
  name: string
  notes: string
  phone: string
  source: 'blob' | 'database'
  sourcePage: string
  topic: string
}

type EncryptedConsultationPayload = {
  authTag: string
  data: string
  iv: string
  version: 1
}

const getConsultationSecret = (): string => {
  return process.env.CONSULTATION_DASHBOARD_SECRET || process.env.PAYLOAD_SECRET || ''
}

const getConsultationKey = (): Buffer => {
  const secret = getConsultationSecret()

  if (!secret) {
    throw new Error('CONSULTATION_DASHBOARD_SECRET or PAYLOAD_SECRET is required.')
  }

  return crypto.createHash('sha256').update(secret).digest()
}

const encryptConsultationRecord = (record: Omit<ConsultationInboxRecord, 'source'>): string => {
  const key = getConsultationKey()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const payload = Buffer.from(JSON.stringify(record), 'utf8')
  const data = Buffer.concat([cipher.update(payload), cipher.final()])
  const authTag = cipher.getAuthTag()

  const encryptedPayload: EncryptedConsultationPayload = {
    authTag: authTag.toString('base64url'),
    data: data.toString('base64url'),
    iv: iv.toString('base64url'),
    version: 1,
  }

  return JSON.stringify(encryptedPayload)
}

const decryptConsultationRecord = (payload: string): ConsultationInboxRecord => {
  const parsed = JSON.parse(payload) as EncryptedConsultationPayload
  const key = getConsultationKey()
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(parsed.iv, 'base64url'),
  )

  decipher.setAuthTag(Buffer.from(parsed.authTag, 'base64url'))

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(parsed.data, 'base64url')),
    decipher.final(),
  ]).toString('utf8')

  return {
    ...(JSON.parse(plaintext) as Omit<ConsultationInboxRecord, 'source'>),
    source: 'blob',
  }
}

const toDatabaseRecord = (record: ConsultationRequest): ConsultationInboxRecord => {
  return {
    createdAt: record.createdAt,
    education: record.education,
    id: String(record.id),
    locale: (record.locale === 'en' ? 'en' : 'zh') satisfies SiteLocale,
    name: record.name,
    notes: record.notes || '',
    phone: record.phone,
    source: 'database',
    sourcePage: record.sourcePage || '/',
    topic: record.topic || '',
  }
}

const createDeduplicationKey = (record: ConsultationInboxRecord): string => {
  return [
    record.name,
    record.phone,
    record.education,
    record.topic,
    record.notes,
    record.sourcePage,
    record.createdAt,
  ].join('::')
}

const readBlobRecord = async (url: string): Promise<ConsultationInboxRecord | null> => {
  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) return null

  const encryptedPayload = await response.text()

  return decryptConsultationRecord(encryptedPayload)
}

const listBlobRecords = async (limit: number): Promise<ConsultationInboxRecord[]> => {
  const results = await list({
    limit: Math.min(limit, MAX_INBOX_RECORDS),
    prefix: `${CONSULTATION_BLOB_PREFIX}/`,
  })

  const sortedBlobs = results.blobs
    .slice()
    .sort((left, right) => right.uploadedAt.getTime() - left.uploadedAt.getTime())
    .slice(0, limit)

  const records = await Promise.all(sortedBlobs.map((blob) => readBlobRecord(blob.url)))

  return records.filter((record): record is ConsultationInboxRecord => Boolean(record))
}

const listDatabaseRecords = async (limit: number): Promise<ConsultationInboxRecord[]> => {
  const payload = await getPayload({ config: configPromise })
  const results = await payload.find({
    collection: 'consultation-requests',
    depth: 0,
    limit,
    overrideAccess: true,
    pagination: false,
    sort: '-createdAt',
  })

  return results.docs.map((record) => toDatabaseRecord(record as ConsultationRequest))
}

export const listConsultationInboxRecords = async (
  limit = 100,
): Promise<ConsultationInboxRecord[]> => {
  const safeLimit = Math.min(Math.max(limit, 1), MAX_INBOX_RECORDS)
  const [blobRecords, databaseRecords] = await Promise.all([
    listBlobRecords(safeLimit).catch((error) => {
      console.warn('[consultation-inbox] Failed to read consultation blobs.')
      console.warn(error)
      return [] as ConsultationInboxRecord[]
    }),
    listDatabaseRecords(safeLimit).catch((error) => {
      console.warn('[consultation-inbox] Failed to read consultation requests from database.')
      console.warn(error)
      return [] as ConsultationInboxRecord[]
    }),
  ])

  const merged = new Map<string, ConsultationInboxRecord>()

  for (const record of [...blobRecords, ...databaseRecords]) {
    const key = createDeduplicationKey(record)

    if (!merged.has(key)) {
      merged.set(key, record)
    }
  }

  return Array.from(merged.values())
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, safeLimit)
}

export const storeConsultationInboxRecord = async (input: {
  education: string
  locale: SiteLocale
  name: string
  notes: string
  phone: string
  sourcePage: string
  topic: string
}): Promise<ConsultationInboxRecord> => {
  const createdAt = new Date().toISOString()
  const record: Omit<ConsultationInboxRecord, 'source'> = {
    createdAt,
    education: input.education,
    id: `cr_${crypto.randomUUID()}`,
    locale: input.locale,
    name: input.name,
    notes: input.notes,
    phone: input.phone,
    sourcePage: input.sourcePage,
    topic: input.topic,
  }
  const encryptedPayload = encryptConsultationRecord(record)
  const recordDate = createdAt.slice(0, 10)

  await put(`${CONSULTATION_BLOB_PREFIX}/${recordDate}/${record.id}.json`, encryptedPayload, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8',
  })

  return {
    ...record,
    source: 'blob',
  }
}
