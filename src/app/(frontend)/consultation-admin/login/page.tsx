import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import {
  getConsultationDashboardSession,
  isConsultationDashboardConfigured,
} from '@/utilities/consultationDashboardAuth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: 'Consultation Login | PaperBridge',
}

type Args = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function ConsultationAdminLoginPage({ searchParams }: Args) {
  const session = await getConsultationDashboardSession()

  if (session) {
    redirect('/consultation-admin')
  }

  const { error } = await searchParams
  const isConfigured = isConsultationDashboardConfigured()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_32%),linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] py-24">
      <div className="container">
        <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">Consultation Backend</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
            登录查看咨询需求
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            这个后台只用于查看表单收集到的需求，不承担文章管理。
          </p>

          {!isConfigured && (
            <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-800">
              当前环境还没有配置后台账号密码。
            </div>
          )}

          {error === '1' && (
            <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-7 text-rose-700">
              用户名或密码不正确，请重新输入。
            </div>
          )}

          <form action="/consultation-admin/auth" className="mt-8 space-y-4" method="post">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">用户名</span>
              <input
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#fb923c] focus:bg-white"
                name="username"
                required
                type="text"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-600">密码</span>
              <input
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#fb923c] focus:bg-white"
                name="password"
                required
                type="password"
              />
            </label>

            <button
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#f97316] text-sm font-semibold text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!isConfigured}
              type="submit"
            >
              登录后台
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
