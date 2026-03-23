import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  const appendCacheTag = (value: string) => (cacheTag ? `${value}?${cacheTag}` : value)
  const blobBaseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/$/, '')

  const rewriteToBlob = (pathname: string) => {
    if (!blobBaseUrl) return null

    return appendCacheTag(`${blobBaseUrl}/${pathname.replace(/^\/+/, '')}`)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return appendCacheTag(url)
  }

  // Legacy local fallback: when uploads live in Next's public/media directory, convert
  // Payload's API file path into the matching public asset path.
  const localUploadMatch = url.match(/^\/api\/media\/file\/(.+)$/)
  if (localUploadMatch) {
    const blobUrl = rewriteToBlob(`media/${localUploadMatch[1]}`)

    if (blobUrl) {
      return blobUrl
    }

    return appendCacheTag(`/media/${localUploadMatch[1]}`)
  }

  if (url.startsWith('/media/')) {
    const blobUrl = rewriteToBlob(url)

    if (blobUrl) {
      return blobUrl
    }
  }

  // Keep same-origin media relative so Next/Image works across local, preview, and production hosts.
  if (url.startsWith('/')) {
    return appendCacheTag(url)
  }

  const baseUrl = getClientSideURL()
  return appendCacheTag(`${baseUrl}/${url}`)
}
