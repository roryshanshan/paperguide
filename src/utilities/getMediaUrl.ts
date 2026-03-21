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

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return appendCacheTag(url)
  }

  // Payload may return local uploads through the API file endpoint, but on Vercel these files
  // are reliably available from Next's public directory instead.
  const localUploadMatch = url.match(/^\/api\/media\/file\/(.+)$/)
  if (localUploadMatch) {
    return appendCacheTag(`/media/${localUploadMatch[1]}`)
  }

  // Keep same-origin media relative so Next/Image works across local, preview, and production hosts.
  if (url.startsWith('/')) {
    return appendCacheTag(url)
  }

  const baseUrl = getClientSideURL()
  return appendCacheTag(`${baseUrl}/${url}`)
}
