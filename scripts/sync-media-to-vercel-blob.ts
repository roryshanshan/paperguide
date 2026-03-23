import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { del, list, put } from '@vercel/blob'
import { config as loadEnv } from 'dotenv'
import { getPayload } from 'payload'

import type { Media } from '../src/payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '..')
const mediaDir = path.resolve(projectRoot, 'public/media')
const blobPrefix = 'media'
const cacheControlMaxAge = 60 * 60 * 24 * 365
const shouldSyncMediaDocuments = process.env.SYNC_MEDIA_DOCUMENTS === 'true'

for (const envFile of ['.env.vercel.local', '.env.local', '.env']) {
  loadEnv({
    path: path.resolve(projectRoot, envFile),
    override: false,
  })
}

const token = process.env.BLOB_READ_WRITE_TOKEN

if (!token) {
  throw new Error('Missing BLOB_READ_WRITE_TOKEN. Pull Vercel envs or set the token before syncing media.')
}

const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()

if (!storeId) {
  throw new Error('Invalid BLOB_READ_WRITE_TOKEN format. Expected a Vercel Blob read/write token.')
}

const blobBaseUrl = `https://${storeId}.public.blob.vercel-storage.com`

type ExistingBlob = {
  size: number
  url: string
}

type MediaWithBlobFields = Media & {
  prefix?: string | null
}

const walkFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.resolve(dir, entry.name)

      if (entry.isDirectory()) {
        return walkFiles(fullPath)
      }

      return [fullPath]
    }),
  )

  return files.flat().sort((left, right) => left.localeCompare(right))
}

const fetchExistingBlobs = async (): Promise<Map<string, ExistingBlob>> => {
  const existing = new Map<string, ExistingBlob>()
  let cursor: string | undefined

  do {
    const response = await list({
      cursor,
      limit: 1000,
      prefix: `${blobPrefix}/`,
      token,
    })

    for (const blob of response.blobs) {
      existing.set(blob.pathname, {
        size: blob.size,
        url: blob.url,
      })
    }

    cursor = response.cursor
  } while (cursor)

  return existing
}

const encodeBlobPath = (value: string) =>
  value
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

const createBlobUrl = (filename?: string | null) =>
  filename ? `${blobBaseUrl}/${encodeBlobPath(`${blobPrefix}/${filename}`)}` : null

const updateMediaDocuments = async () => {
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  try {
    const mediaDocs = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 1000,
      sort: 'filename',
    })

    let updated = 0
    let skipped = 0

    for (const doc of mediaDocs.docs as MediaWithBlobFields[]) {
      const expectedUrl = createBlobUrl(doc.filename)
      const expectedThumbnailUrl =
        createBlobUrl(doc.sizes?.thumbnail?.filename) || createBlobUrl(doc.filename)
      const nextSizes = doc.sizes
        ? Object.fromEntries(
            Object.entries(doc.sizes).map(([sizeName, sizeValue]) => {
              if (!sizeValue) {
                return [sizeName, sizeValue]
              }

              return [
                sizeName,
                {
                  ...sizeValue,
                  url: createBlobUrl(sizeValue.filename),
                },
              ]
            }),
          )
        : undefined

      const hasSizesChanged =
        JSON.stringify(doc.sizes || null) !== JSON.stringify(nextSizes || null)
      const shouldUpdate =
        doc.prefix !== blobPrefix ||
        doc.url !== expectedUrl ||
        doc.thumbnailURL !== expectedThumbnailUrl ||
        hasSizesChanged

      if (!shouldUpdate) {
        skipped += 1
        continue
      }

      const updateData: Record<string, unknown> = {
        prefix: blobPrefix,
        sizes: nextSizes,
        thumbnailURL: expectedThumbnailUrl,
        url: expectedUrl,
      }

      await payload.update({
        collection: 'media',
        id: doc.id,
        // The Blob plugin injects `prefix` into the schema at runtime in production.
        data: updateData as never,
      })

      updated += 1
      console.log(`[media:sync] Rewrote media document ${doc.id} (${doc.filename}).`)
    }

    console.log(`[media:sync] Media documents synced. Updated ${updated}, skipped ${skipped}.`)
  } finally {
    await payload.destroy()
  }
}

const sync = async () => {
  const files = await walkFiles(mediaDir)
  const existing = await fetchExistingBlobs()

  let created = 0
  let replaced = 0
  let skipped = 0

  console.log(`[media:sync] Found ${files.length} local files in public/media.`)
  console.log(`[media:sync] Found ${existing.size} blobs under prefix "${blobPrefix}/".`)

  for (const filePath of files) {
    const fileBuffer = await readFile(filePath)
    const fileStats = await stat(filePath)
    const relativePath = path.relative(mediaDir, filePath).split(path.sep).join('/')
    const blobPath = `${blobPrefix}/${relativePath}`
    const existingBlob = existing.get(blobPath)

    if (existingBlob?.size === fileStats.size) {
      skipped += 1
      console.log(`[media:sync] Skip ${blobPath} (already present with same size).`)
      continue
    }

    if (existingBlob) {
      await del(existingBlob.url, { token })
      replaced += 1
      console.log(`[media:sync] Replace ${blobPath} (size changed).`)
    } else {
      created += 1
      console.log(`[media:sync] Upload ${blobPath}.`)
    }

    await put(blobPath, fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
      cacheControlMaxAge,
      token,
    })
  }

  console.log(
    `[media:sync] Completed. Created ${created}, replaced ${replaced}, skipped ${skipped}, total ${files.length}.`,
  )

  if (!shouldSyncMediaDocuments) {
    console.log(
      '[media:sync] Skipping media document rewrite. Set SYNC_MEDIA_DOCUMENTS=true to update database URLs when quota allows.',
    )
    return
  }

  try {
    await updateMediaDocuments()
  } catch (error) {
    console.warn(
      '[media:sync] Blob files are synced, but media document URLs were not rewritten. Falling back to runtime Blob URL rewriting.',
    )
    console.warn(error)
  }
}

sync().catch((error) => {
  console.error('[media:sync] Failed to sync media to Vercel Blob.')
  console.error(error)
  process.exit(1)
})
