import React from 'react'

import type { Post } from '@/payload-types'
import { JsonLd } from '@/components/JsonLd'
import { buildArticleSchema } from '@/utilities/schema'

export const ArticleJsonLd: React.FC<{
  locale: 'zh' | 'en'
  post: Post
}> = ({ locale, post }) => {
  return <JsonLd data={buildArticleSchema({ locale, post })} />
}
