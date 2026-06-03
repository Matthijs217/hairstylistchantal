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
