/**
 * Voer uit met: node scripts/seed-diensten.mjs
 * Zet SANITY_TOKEN in .env (Editor of boven token via sanity.io/manage)
 */

import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
  projectId: 'h5u9npf1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const diensten = [
  {
    _id: 'dienst-knippen',
    _type: 'dienst',
    titel: 'Knippen',
    slug: { _type: 'slug', current: 'knippen' },
    beschrijving: 'Een frisse knipbeurt, geheel afgestemd op jouw haartype en wensen. Voor dames, heren en kinderen.',
    prijs: 'Vanaf €24,50',
    duur: '30 – 65 min',
    volgorde: 1,
  },
  {
    _id: 'dienst-wassen-knippen-fohnen',
    _type: 'dienst',
    titel: 'Wassen, Knippen & Föhnen',
    slug: { _type: 'slug', current: 'wassen-knippen-fohnen' },
    beschrijving: 'Inclusief wasbehandeling en professionele föhnstyle. Jouw haar gewassen, geknipt en perfect gedroogd.',
    prijs: 'Vanaf €35,50',
    duur: '40 – 65 min',
    volgorde: 2,
  },
  {
    _id: 'dienst-fohnen-stylen',
    _type: 'dienst',
    titel: 'Föhnen & Stylen',
    slug: { _type: 'slug', current: 'fohnen-stylen' },
    beschrijving: 'Professioneel gewassen en gefohnd. Perfect voor een speciale gelegenheid of gewoon een verwenmomenten.',
    prijs: 'Vanaf €25,50',
    duur: '35 – 60 min',
    volgorde: 3,
  },
  {
    _id: 'dienst-kleuren',
    _type: 'dienst',
    titel: 'Kleuren',
    slug: { _type: 'slug', current: 'kleuren' },
    beschrijving: 'Volledige haarkleurbehandeling met duurzame producten. Inclusief föhnen of knippen op aanvraag.',
    prijs: 'Vanaf €53,50',
    duur: 'Op aanvraag',
    volgorde: 4,
  },
  {
    _id: 'dienst-highlights',
    _type: 'dienst',
    titel: 'Highlights & Balayage',
    slug: { _type: 'slug', current: 'highlights-balayage' },
    beschrijving: 'Prachtige highlights of een natuurlijke balayage voor een zonnige glans. Zorgvuldig en secuur aangebracht.',
    prijs: 'Vanaf €40,95',
    duur: 'Op aanvraag',
    volgorde: 5,
  },
];

console.log('Diensten aanmaken...');

for (const dienst of diensten) {
  await client.createOrReplace(dienst);
  console.log(`✓ ${dienst.titel}`);
}

console.log('\nKlaar! Ga naar /studio om afbeeldingen toe te voegen.');
