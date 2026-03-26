import type { Metadata } from 'next'

import {
  generateServiceLandingPageMetadata,
  renderServiceLandingPage,
} from '@/components/service/ServiceLandingPage'

export const revalidate = 3600

export default async function ThesisDefenseGuidancePage() {
  return renderServiceLandingPage('lunwen-dabian-zhidao')
}

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceLandingPageMetadata('lunwen-dabian-zhidao')
}
