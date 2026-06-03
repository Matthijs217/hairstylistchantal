import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import dienst from './src/sanity/schemas/dienst.js';
import foto from './src/sanity/schemas/foto.js';

export default defineConfig({
  projectId: 'h5u9npf1',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [dienst, foto],
  },
});
