import { Resend } from 'resend';
import * as React from 'react';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  let lic: string = "";
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const item_name = searchParams.get('item_name');

    let to1: string = 'zhenxiufeng@zohomail.com';
    let subject: string = 'download: ' + item_name;
    let txt: string = 'download: ' + item_name;

    const { data, error } = await resend.emails.send({
      from: 'support@photonest.io',
      to: to1,
      subject: subject,
      text: txt
    });

    return Response.json({ key: item_name });

  } catch (error) {
    return Response.json({ key: "err" });
  }
}