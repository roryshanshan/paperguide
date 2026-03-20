import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

import config from '@payload-config'
import { isSiteLocale } from '@/utilities/siteLocale'

export async function POST(request: NextRequest) {
  const payload = await getPayload({ config })
  const body = await request.json()

  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : ''
  const education = typeof body?.education === 'string' ? body.education.trim() : ''
  const topic = typeof body?.topic === 'string' ? body.topic.trim() : ''
  const notes = typeof body?.notes === 'string' ? body.notes.trim() : ''
  const locale = isSiteLocale(body?.locale) ? body.locale : 'zh'
  const sourcePage = typeof body?.sourcePage === 'string' ? body.sourcePage.trim() : '/'

  if (!name || !phone || !education) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  await payload.create({
    collection: 'consultation-requests',
    data: {
      education,
      locale,
      name,
      notes,
      phone,
      sourcePage,
      topic,
    },
  })

  return NextResponse.json({ success: true })
}
