export default {
  name: 'instellingen',
  title: 'Instellingen',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
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
