import type { Metadata } from 'next'

import {
  generateServiceLandingPageMetadata,
  renderServiceLandingPage,
} from '@/components/service/ServiceLandingPage'

export const revalidate = 3600

export default async function DoctoralThesisSupportPage() {
  return renderServiceLandingPage('boshi-lunwen-fudao')
}

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceLandingPageMetadata('boshi-lunwen-fudao')
}
