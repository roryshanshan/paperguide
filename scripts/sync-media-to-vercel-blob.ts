import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { del, list, put } from '@vercel/blob'
import { config as loadEnv } from 'dotenv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '..')
const mediaDir = path.resolve(projectRoot, 'public/media')
const blobPrefix = 'media'
const cacheControlMaxAge = 60 * 60 * 24 * 365

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

type ExistingBlob = {
  size: number
  url: string
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
}

sync().catch((error) => {
  console.error('[media:sync] Failed to sync media to Vercel Blob.')
  console.error(error)
  process.exit(1)
})
