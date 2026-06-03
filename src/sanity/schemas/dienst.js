export default {
  name: 'dienst',
  title: 'Dienst',
  type: 'document',
  fields: [
    {
      name: 'titel',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titel' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'beschrijving',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
    },
    {
      name: 'afbeelding',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'prijs',
      title: 'Prijs',
      type: 'string',
      description: 'Bijv. "Vanaf €35" of "€45 – €65"',
    },
    {
      name: 'duur',
      title: 'Duur',
      type: 'string',
      description: 'Bijv. "45 min" of "1 – 2 uur"',
    },
    {
      name: 'volgorde',
      title: 'Volgorde',
      type: 'number',
      description: 'Bepaalt de volgorde op de pagina (laag = eerst)',
    },
  ],
  preview: {
    select: { title: 'titel', media: 'afbeelding' },
  },
};
