import type { Metadata } from 'next'

import {
  generateServiceLandingPageMetadata,
  renderServiceLandingPage,
} from '@/components/service/ServiceLandingPage'

export const revalidate = 3600

export default async function EnglishThesisSupportPage() {
  return renderServiceLandingPage('yingwen-lunwen-fudao')
}

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceLandingPageMetadata('yingwen-lunwen-fudao')
}
