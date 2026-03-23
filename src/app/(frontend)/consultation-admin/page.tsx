import type { Metadata } from 'next'

import Link from 'next/link'
import { redirect } from 'next/navigation'

import {
  getConsultationDashboardSession,
  isConsultationDashboardConfigured,
} from '@/utilities/consultationDashboardAuth'
import { listConsultationInboxRecords } from '@/utilities/consultationInbox'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: 'Consultation Inbox | PaperBridge',
}

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('zh-CN', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

const educationLabelMap: Record<string, string> = {
  bachelor: '本科',
  master: '硕士',
  other: '其他',
  phd: '博士',
}

export default async function ConsultationAdminPage() {
  if (!isConsultationDashboardConfigured()) {
    return (
      <div className="container py-24">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-amber-200 bg-amber-50 p-8">
          <p className="text-sm font-medium text-amber-700">后台未完成配置</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            咨询后台还没有登录凭据
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            需要先配置 `CONSULTATION_DASHBOARD_USERNAME`、`CONSULTATION_DASHBOARD_PASSWORD`
            和 `CONSULTATION_DASHBOARD_SECRET`。
          </p>
        </div>
      </div>
    )
  }

  const session = await getConsultationDashboardSession()

  if (!session) {
    redirect('/consultation-admin/login')
  }

  const records = await listConsultationInboxRecords(120)

  return (
    <div className="min-h-screen bg-[#fffaf5] py-12">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">Consultation Inbox</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950">
                咨询需求后台
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                这里只显示前台提交的咨询表单，不包含文章编辑功能。数据库挂掉时，新表单也会继续进入这个后台。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                当前登录：{session.username}
              </div>
              <div className="rounded-full border border-[#fdba74] bg-[#fff7ed] px-4 py-2 text-sm font-medium text-[#c2410c]">
                共 {records.length} 条
              </div>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                href="/consultation-admin/logout"
              >
                退出登录
              </Link>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs uppercase tracking-[0.22em] text-slate-500">
                    <th className="px-5 py-4">时间</th>
                    <th className="px-5 py-4">称呼</th>
                    <th className="px-5 py-4">电话 / 微信</th>
                    <th className="px-5 py-4">学历</th>
                    <th className="px-5 py-4">研究方向</th>
                    <th className="px-5 py-4">需求说明</th>
                    <th className="px-5 py-4">来源页面</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {records.length === 0 ? (
                    <tr>
                      <td className="px-5 py-10 text-sm text-slate-500" colSpan={7}>
                        暂时还没有收到新的咨询表单。
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => (
                      <tr className="align-top" key={`${record.source}-${record.id}`}>
                        <td className="px-5 py-5 text-sm text-slate-600">{formatDate(record.createdAt)}</td>
                        <td className="px-5 py-5 text-sm font-medium text-slate-900">{record.name}</td>
                        <td className="px-5 py-5 text-sm text-slate-900">{record.phone}</td>
                        <td className="px-5 py-5 text-sm text-slate-600">
                          {educationLabelMap[record.education] || record.education}
                        </td>
                        <td className="px-5 py-5 text-sm text-slate-600">
                          {record.topic || <span className="text-slate-400">未填写</span>}
                        </td>
                        <td className="px-5 py-5 text-sm leading-7 text-slate-600">
                          {record.notes || <span className="text-slate-400">未填写</span>}
                        </td>
                        <td className="px-5 py-5 text-sm text-slate-500">{record.sourcePage}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
