export default {
  name: 'over',
  title: 'Over mij',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'naam',
      title: 'Naam',
      type: 'string',
      initialValue: 'Chantal Oosterlaken',
    },
    {
      name: 'functie',
      title: 'Functie / Titel',
      type: 'string',
      initialValue: 'Hairstylist',
    },
    {
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'intro',
      title: 'Intro (korte tekst)',
      type: 'text',
      rows: 2,
      description: 'Verschijnt groot bovenaan',
    },
    {
      name: 'bio',
      title: 'Biografie',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Uitgebreid verhaal over Chantal en de salon',
    },
    {
      name: 'waarden',
      title: 'Kernwaarden',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titel', title: 'Titel', type: 'string' },
            { name: 'omschrijving', title: 'Omschrijving', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'titel' } },
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Over mij' };
    },
  },
};
