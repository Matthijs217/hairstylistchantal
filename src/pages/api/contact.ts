export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const lastHitByIp = new Map<string, number>();

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const naam      = String(data.naam      ?? '').trim();
    const email     = String(data.email     ?? '').trim();
    const telefoon  = String(data.telefoon  ?? '').trim();
    const bericht   = String(data.bericht   ?? '').trim();
    const onderwerp = String(data.onderwerp ?? '').trim();
    const honeypot  = String(data.bedrijf   ?? '').trim();

    const geldigeOnderwerpen = ['Afspraak maken', 'Vragen', 'Overig'];

    if (honeypot) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (!naam || !email || !bericht || !geldigeOnderwerpen.includes(onderwerp)) {
      return new Response(JSON.stringify({ ok: false, error: 'Verplichte velden ontbreken.' }), { status: 400 });
    }

    if (naam.length > 80 || bericht.length > 4000) {
      return new Response(JSON.stringify({ ok: false, error: 'Invoer te lang.' }), { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'Ongeldig e-mailadres.' }), { status: 400 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const now = Date.now();
    const last = lastHitByIp.get(ip) ?? 0;
    if (now - last < 30_000) {
      return new Response(JSON.stringify({ ok: false, error: 'Te veel verzoeken.' }), { status: 429 });
    }
    lastHitByIp.set(ip, now);

    const resendKey = import.meta.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('[contact] RESEND_API_KEY ontbreekt');
      return new Response(JSON.stringify({ ok: false, error: 'Server niet geconfigureerd.' }), { status: 500 });
    }

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from:    'Contactformulier <noreply@hairstylistchantal.nl>',
      to:      ['info@hairstylistchantal.nl'],
      replyTo: `${naam} <${email}>`,
      subject: `${onderwerp} — ${naam}`,
      text: [
        `Naam:     ${naam}`,
        `E-mail:   ${email}`,
        telefoon ? `Telefoon: ${telefoon}` : '',
        '',
        bericht,
      ].filter(Boolean).join('\n'),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('[contact] fout:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Versturen mislukt.' }), { status: 500 });
  }
};
