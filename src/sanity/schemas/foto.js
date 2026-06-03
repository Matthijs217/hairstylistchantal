export default {
  name: 'foto',
  title: "Foto",
  type: 'document',
  fields: [
    {
      name: 'afbeelding',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Beschrijving (alt-tekst)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'datum',
      title: 'Datum',
      type: 'date',
    },
  ],
  preview: {
    select: { title: 'alt', media: 'afbeelding' },
  },
};
