export const prerender = false;

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const naam     = (data.get('naam')     as string | null)?.trim() ?? '';
  const email    = (data.get('email')    as string | null)?.trim() ?? '';
  const telefoon = (data.get('telefoon') as string | null)?.trim() ?? '';
  const bericht  = (data.get('bericht')  as string | null)?.trim() ?? '';

  if (!naam || !email || !bericht) {
    return new Response(JSON.stringify({ error: 'Velden naam, email en bericht zijn verplicht.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Ongeldig e-mailadres.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const smtpHost = import.meta.env.SMTP_HOST;
  const smtpPort = Number(import.meta.env.SMTP_PORT ?? 587);
  const smtpUser = import.meta.env.SMTP_USER;
  const smtpPass = import.meta.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('[contact] SMTP env vars ontbreken:', { smtpHost, smtpUser, hasPass: !!smtpPass });
    return new Response(JSON.stringify({ error: 'Server niet geconfigureerd.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const transporter = nodemailer.createTransport({
    host:   smtpHost,
    port:   smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from:    `"${naam}" <${smtpUser}>`,
      replyTo: `"${naam}" <${email}>`,
      to:      'info@hairstylistchantal.nl',
      subject: `Contactformulier – ${naam}`,
      text: [
        `Naam:     ${naam}`,
        `E-mail:   ${email}`,
        telefoon ? `Telefoon: ${telefoon}` : '',
        '',
        bericht,
      ].filter(Boolean).join('\n'),
      html: `
        <p><strong>Naam:</strong> ${naam}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        ${telefoon ? `<p><strong>Telefoon:</strong> ${telefoon}</p>` : ''}
        <hr />
        <p>${bericht.replace(/\n/g, '<br />')}</p>
      `,
    });
  } catch (err) {
    console.error('[contact] sendMail mislukt:', err);
    return new Response(JSON.stringify({ error: 'Versturen mislukt.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
