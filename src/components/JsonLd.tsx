import React from 'react'

type JsonLdObject = Record<string, unknown>

type Props = {
  data?: JsonLdObject | Array<JsonLdObject | null | undefined | false> | null
}

const isJsonLdObject = (value: unknown): value is JsonLdObject => {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

export const JsonLd = ({ data }: Props) => {
  const normalizedData = Array.isArray(data) ? data.filter(isJsonLdObject) : data

  if (!normalizedData || (Array.isArray(normalizedData) && normalizedData.length === 0)) {
    return null
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(normalizedData) }}
      type="application/ld+json"
    />
  )
}
