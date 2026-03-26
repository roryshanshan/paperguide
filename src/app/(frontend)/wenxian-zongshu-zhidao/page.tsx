import type { Metadata } from 'next'

import {
  generateServiceLandingPageMetadata,
  renderServiceLandingPage,
} from '@/components/service/ServiceLandingPage'

export const revalidate = 3600

export default async function LiteratureReviewGuidancePage() {
  return renderServiceLandingPage('wenxian-zongshu-zhidao')
}

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceLandingPageMetadata('wenxian-zongshu-zhidao')
}
