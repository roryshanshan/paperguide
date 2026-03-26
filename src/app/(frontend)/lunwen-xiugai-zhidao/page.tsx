import type { Metadata } from 'next'

import {
  generateServiceLandingPageMetadata,
  renderServiceLandingPage,
} from '@/components/service/ServiceLandingPage'

export const revalidate = 3600

export default async function ThesisRevisionGuidancePage() {
  return renderServiceLandingPage('lunwen-xiugai-zhidao')
}

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceLandingPageMetadata('lunwen-xiugai-zhidao')
}
