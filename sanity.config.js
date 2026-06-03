import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import dienst from './src/sanity/schemas/dienst.js';
import foto from './src/sanity/schemas/foto.js';
import instellingen from './src/sanity/schemas/instellingen.js';
import prijslijst from './src/sanity/schemas/prijslijst.js';
import over from './src/sanity/schemas/over.js';

const singletons = ['instellingen', 'prijslijst', 'over'];

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
            S.listItem()
              .title('Prijslijst')
              .child(S.document().schemaType('prijslijst').documentId('prijslijst')),
            S.listItem()
              .title('Over mij')
              .child(S.document().schemaType('over').documentId('over')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletons.includes(item.getId())
            ),
          ]),
    }),
  ],
  schema: {
    types: [dienst, foto, instellingen, prijslijst, over],
  },
});
