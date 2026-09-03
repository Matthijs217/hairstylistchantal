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
      name: 'parkeertip',
      title: 'Parkeertip / bezoekinfo',
      type: 'text',
      rows: 3,
      description: 'Optionele tip voor bezoekers, bijv. over parkeren of de route naar de deur. Wordt getoond onder de "Route plannen" knop.',
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
    {
      name: 'openingstijdenNotitie',
      title: 'Berichtje bij openingstijden',
      type: 'text',
      rows: 2,
      description: 'Optioneel berichtje onder de openingstijden, bijv. "Wilt u \'s avonds boeken? Bel dan even."',
    },
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Instellingen' };
    },
  },
};
