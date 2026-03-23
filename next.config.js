import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'
const blobStoreId = process.env.BLOB_READ_WRITE_TOKEN?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]
const blobBaseUrl = blobStoreId
  ? `https://${blobStoreId.toLowerCase()}.public.blob.vercel-storage.com`
  : undefined

const remotePatterns = [
  ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
    const url = new URL(item)

    return {
      hostname: url.hostname,
      protocol: url.protocol.replace(':', ''),
    }
  }),
  {
    hostname: '**.public.blob.vercel-storage.com',
    protocol: 'https',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BLOB_BASE_URL: blobBaseUrl,
  },
  images: {
    remotePatterns,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
