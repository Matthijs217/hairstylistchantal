export default {
  name: 'prijslijst',
  title: 'Prijslijst',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'categorieen',
      title: 'Categorieën',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'categorie',
          fields: [
            {
              name: 'naam',
              title: 'Naam',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'items',
              title: 'Behandelingen',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Naam',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'prijs',
                      title: 'Prijs',
                      type: 'string',
                      description: 'Bijv. "€35,50" of "v.a. €53,50"',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'duur',
                      title: 'Duur',
                      type: 'string',
                      description: 'Bijv. "40 min" — laat leeg als niet van toepassing',
                    },
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'prijs' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'naam' },
          },
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Prijslijst' };
    },
  },
};
