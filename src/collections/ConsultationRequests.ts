import type { CollectionConfig } from 'payload'

export const ConsultationRequests: CollectionConfig = {
  slug: 'consultation-requests',
  access: {
    create: () => true,
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ['name', 'phone', 'education', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'education',
      type: 'select',
      options: [
        {
          label: 'Bachelor',
          value: 'bachelor',
        },
        {
          label: 'Master',
          value: 'master',
        },
        {
          label: 'PhD',
          value: 'phd',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      required: true,
    },
    {
      name: 'topic',
      type: 'text',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'locale',
      type: 'text',
    },
    {
      name: 'sourcePage',
      type: 'text',
    },
  ],
}
