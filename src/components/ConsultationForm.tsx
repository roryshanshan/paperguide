'use client'

import { ArrowRight, LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'

import type { SiteLocale } from '@/utilities/siteLocale'

type FormCopy = {
  buttonLabel: string
  description: string
  disclaimer: string
  title: string
}

const educationLabels: Record<SiteLocale, Record<string, string>> = {
  en: {
    bachelor: 'Bachelor',
    master: 'Master',
    other: 'Other',
    phd: 'PhD',
  },
  zh: {
    bachelor: '本科',
    master: '硕士',
    other: '其他',
    phd: '博士',
  },
}

export const ConsultationForm: React.FC<{
  copy: FormCopy
  locale: SiteLocale
}> = ({ copy, locale }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')

  const ui = locale === 'en'
    ? {
        notes: 'Describe your current challenge',
        notesPlaceholder: 'Example: proposal is too broad, methodology is unclear, or defense is approaching.',
        phone: 'Phone / WeChat',
        submitSuccess: 'Submitted successfully. Your request is now available in the consultation inbox.',
        topic: 'Research area',
        topicPlaceholder: 'Example: education technology, public management, AI, materials engineering...',
        yourDegree: 'Degree level',
        yourName: 'Name',
      }
    : {
        notes: '当前最棘手的问题',
        notesPlaceholder: '例如：选题太大、方法不会写、返修意见很多、快答辩了等。',
        phone: '电话 / 微信',
        submitSuccess: '提交成功，咨询后台已经收到这条记录。',
        topic: '研究方向',
        topicPlaceholder: '例如：教育技术、公共管理、人工智能、材料工程等',
        yourDegree: '学历阶段',
        yourName: '称呼',
      }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.3)] lg:p-8">
      <div className="mb-6">
        <p className="mb-2 text-xs uppercase tracking-[0.32em] text-white/50">Consultation</p>
        <h3 className="text-2xl font-semibold tracking-tight">{copy.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">{copy.description}</p>
      </div>

      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault()
          setIsSubmitting(true)
          setStatus('idle')

          const form = new FormData(event.currentTarget)

          const response = await fetch('/submit-consultation', {
            body: JSON.stringify({
              education: form.get('education'),
              locale,
              name: form.get('name'),
              notes: form.get('notes'),
              phone: form.get('phone'),
              sourcePage: window.location.pathname,
              topic: form.get('topic'),
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          setIsSubmitting(false)

          if (!response.ok) {
            setStatus('error')
            return
          }

          event.currentTarget.reset()
          setStatus('success')
        }}
      >
        <label className="grid gap-2">
          <span className="text-sm text-white/72">{ui.yourName}</span>
          <input
            className="h-12 rounded-2xl border border-white/12 bg-white/6 px-4 text-sm outline-none transition focus:border-white/35"
            name="name"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/72">{ui.phone}</span>
          <input
            className="h-12 rounded-2xl border border-white/12 bg-white/6 px-4 text-sm outline-none transition focus:border-white/35"
            name="phone"
            required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/72">{ui.yourDegree}</span>
          <select
            className="h-12 rounded-2xl border border-white/12 bg-white/6 px-4 text-sm outline-none transition focus:border-white/35"
            defaultValue="master"
            name="education"
            required
          >
            {Object.entries(educationLabels[locale]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/72">{ui.topic}</span>
          <input
            className="h-12 rounded-2xl border border-white/12 bg-white/6 px-4 text-sm outline-none transition focus:border-white/35"
            name="topic"
            placeholder={ui.topicPlaceholder}
          />
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm text-white/72">{ui.notes}</span>
          <textarea
            className="min-h-32 rounded-[1.5rem] border border-white/12 bg-white/6 px-4 py-3 text-sm outline-none transition focus:border-white/35"
            name="notes"
            placeholder={ui.notesPlaceholder}
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#f97316] px-6 text-sm font-semibold text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4" />
            )}
            {copy.buttonLabel}
          </button>

          <p className="max-w-lg text-xs leading-5 text-white/48">{copy.disclaimer}</p>
        </div>

        {status === 'success' && (
          <p className="md:col-span-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {ui.submitSuccess}
          </p>
        )}
        {status === 'error' && (
          <p className="md:col-span-2 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {locale === 'en'
              ? 'Submission failed. Please try again.'
              : '提交失败，请稍后再试。'}
          </p>
        )}
      </form>
    </div>
  )
}
