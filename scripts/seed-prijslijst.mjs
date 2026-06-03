/**
 * Voer uit met: node scripts/seed-prijslijst.mjs
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

const prijslijst = {
  _id: 'prijslijst',
  _type: 'prijslijst',
  categorieen: [
    {
      _key: 'cat-1',
      naam: 'Dames — Wassen, Knippen & Föhnen',
      items: [
        { _key: 'item-1-1', label: 'Kort haar',      prijs: '€35,50', duur: '40 min' },
        { _key: 'item-1-2', label: 'Halflang haar',  prijs: '€40,50', duur: '50 min' },
        { _key: 'item-1-3', label: 'Lang haar',      prijs: '€47,50', duur: '65 min' },
      ],
    },
    {
      _key: 'cat-2',
      naam: 'Dames — Wassen, Knippen & Drogen',
      items: [
        { _key: 'item-2-1', label: 'Kort haar', prijs: '€29,50', duur: '35 min' },
        { _key: 'item-2-2', label: 'Lang haar',  prijs: '€33,50', duur: '45 min' },
      ],
    },
    {
      _key: 'cat-3',
      naam: 'Dames — Wassen & Föhnen',
      items: [
        { _key: 'item-3-1', label: 'Kort haar',     prijs: '€25,50', duur: '35 min' },
        { _key: 'item-3-2', label: 'Halflang haar', prijs: '€30,50', duur: '45 min' },
        { _key: 'item-3-3', label: 'Lang haar',     prijs: '€37,50', duur: '60 min' },
      ],
    },
    {
      _key: 'cat-4',
      naam: 'Heren — Knippen',
      items: [
        { _key: 'item-4-1', label: 'Kort haar', prijs: '€29,50', duur: '30 min' },
        { _key: 'item-4-2', label: 'Lang haar',  prijs: '€33,50', duur: '40 min' },
      ],
    },
    {
      _key: 'cat-5',
      naam: 'Kinderen — Knippen (t/m 12 jaar)',
      items: [
        { _key: 'item-5-1', label: 'Knippen', prijs: '€24,50', duur: '30 min' },
      ],
    },
    {
      _key: 'cat-6',
      naam: 'Kleuren',
      items: [
        { _key: 'item-6-1', label: 'Kleuren met drogen',           prijs: 'v.a. €53,50', duur: '' },
        { _key: 'item-6-2', label: 'Kleuren + knippen & drogen',   prijs: 'v.a. €83,–',  duur: '' },
        { _key: 'item-6-3', label: 'Kleuren + knippen & föhnen',   prijs: 'v.a. €89,–',  duur: '' },
      ],
    },
    {
      _key: 'cat-7',
      naam: 'Highlights & Balayage',
      items: [
        { _key: 'item-7-1', label: 'Highlights met toner & drogen',  prijs: 'v.a. €40,95',  duur: '' },
        { _key: 'item-7-2', label: 'Highlights met toner & föhnen',  prijs: 'v.a. €76,45',  duur: '' },
        { _key: 'item-7-3', label: 'Balayage met toner & drogen',    prijs: 'v.a. €89,95',  duur: '' },
        { _key: 'item-7-4', label: 'Balayage + knippen & föhnen',    prijs: 'v.a. €125,45', duur: '' },
      ],
    },
  ],
};

console.log('Prijslijst aanmaken...');
await client.createOrReplace(prijslijst);
console.log('✓ Prijslijst opgeslagen');
