import { Resend } from 'resend';
import * as React from 'react';
import { kv } from '@vercel/kv';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  let lic: string = "";
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const item_name = searchParams.get('item_name');

    let to1: string = 'zhenxiufeng@zohomail.com';
    let subject: string = 'download: ' + item_name;
    let txt: string = "";

    await resend.emails.send({
      from: 'support@photonest.io',
      to: to1,
      subject: subject,
      text: txt,
    });

    return Response.json({ key: "ok" });


  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}