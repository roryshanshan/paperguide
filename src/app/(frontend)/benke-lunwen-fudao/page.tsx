import type { Metadata } from 'next'

import {
  generateServiceLandingPageMetadata,
  renderServiceLandingPage,
} from '@/components/service/ServiceLandingPage'

export const revalidate = 3600

export default async function UndergraduateThesisSupportPage() {
  return renderServiceLandingPage('benke-lunwen-fudao')
}

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceLandingPageMetadata('benke-lunwen-fudao')
}
