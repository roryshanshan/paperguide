import type { Metadata } from 'next'

import {
  generateServiceLandingPageMetadata,
  renderServiceLandingPage,
} from '@/components/service/ServiceLandingPage'

export const revalidate = 3600

export default async function GraduationThesisSupportPage() {
  return renderServiceLandingPage('biyelunwen-fudao')
}

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceLandingPageMetadata('biyelunwen-fudao')
}
