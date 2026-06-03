import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import dienst from './src/sanity/schemas/dienst.js';
import foto from './src/sanity/schemas/foto.js';
import instellingen from './src/sanity/schemas/instellingen.js';

export default defineConfig({
  projectId: 'h5u9npf1',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhoud')
          .items([
            S.listItem()
              .title('Instellingen')
              .child(S.document().schemaType('instellingen').documentId('instellingen')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['instellingen'].includes(item.getId())
            ),
          ]),
    }),
  ],
  schema: {
    types: [dienst, foto, instellingen],
  },
});
