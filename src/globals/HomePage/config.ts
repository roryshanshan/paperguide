import type { Field, GlobalConfig } from 'payload'

const localizedLinkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
  },
]

export const HomePage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'metricTitle',
          type: 'text',
        },
        {
          name: 'title',
          type: 'textarea',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'metricCaption',
          type: 'text',
        },
        {
          name: 'pills',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
          ],
        },
        {
          name: 'links',
          type: 'array',
          fields: localizedLinkFields,
          maxRows: 2,
        },
        {
          name: 'metrics',
          type: 'array',
          fields: [
            {
              name: 'value',
              type: 'text',
            },
            {
              name: 'label',
              type: 'text',
            },
          ],
          maxRows: 4,
        },
      ],
    },
    {
      name: 'services',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'points',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'mentors',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'bio',
              type: 'textarea',
            },
            {
              name: 'focus',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'stories',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'degree',
              type: 'text',
            },
            {
              name: 'headline',
              type: 'text',
            },
            {
              name: 'topic',
              type: 'text',
            },
            {
              name: 'outcome',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'process',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'step',
              type: 'text',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'question',
              type: 'text',
            },
            {
              name: 'answer',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'consultation',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'buttonLabel',
          type: 'text',
        },
        {
          name: 'disclaimer',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'primary',
          type: 'group',
          fields: localizedLinkFields,
        },
      ],
    },
  ],
}
