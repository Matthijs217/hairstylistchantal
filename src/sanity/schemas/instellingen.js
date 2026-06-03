export default {
  name: 'instellingen',
  title: 'Instellingen',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'telefoon',
      title: 'Telefoonnummer',
      type: 'string',
      description: 'Bijv. +31 6 12 34 56 78',
    },
    {
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
    },
    {
      name: 'openingstijden',
      title: 'Openingstijden',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'dag',
              title: 'Dag',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'tijd',
              title: 'Tijd',
              type: 'string',
              description: 'Bijv. "09:00 – 18:00" of "Gesloten"',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'dag', subtitle: 'tijd' },
          },
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Instellingen' };
    },
  },
};
