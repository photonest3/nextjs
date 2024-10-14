
import { Resend } from 'resend';
import * as React from 'react';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body.name;
    const email = body.email;
    const message = body.message;
    const from = body.from;
    const ty = body.ty;

    let to1: string = 'zhenxiufeng@zohomail.com';
    let subject: string = 'order-id: ' + name;
    let txt: string = email + ': ' + message;
    if (ty == "from_us") {
      to1 = email;
      subject = name;
      txt = message;
    }

    const { data, error } = await resend.emails.send({
      from: from,
      to: to1,
      subject: subject,
      text: txt,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    else {
      return Response.json({ data });
    }

  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
