import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

export const handleRedirects = async ({ disableNotFound, url }: Props) => {
  let redirects: Awaited<ReturnType<ReturnType<typeof getCachedRedirects>>>

  try {
    redirects = await getCachedRedirects()()
  } catch (error) {
    console.error('Failed to load redirects', error)

    if (disableNotFound) return null

    notFound()
  }

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      let document: Page | Post | undefined

      try {
        document = (await getCachedDocument(collection, id)()) as Page | Post | undefined
      } catch (error) {
        console.error('Failed to resolve redirect target', error)

        if (disableNotFound) return null

        notFound()
      }

      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        document?.slug
      }`
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async (props) => {
  return handleRedirects(props)
}
