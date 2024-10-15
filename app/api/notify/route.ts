import { Resend } from 'resend';
import * as React from 'react';
import { kv } from '@vercel/kv';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        /*
        let formData = await request.formData();
        //const mc_gross = formData.get('mc_gross');
         formData.set("cmd", "_notify-validate");   
        */

        const text = await request.text();

        let params = new URLSearchParams(text);
        const item_name = params.get('item_name');
        const item_number = params.get('item_number');
        const payment_status = params.get('payment_status');
        const payer_email = params.get('payer_email');
        const receiver_id = params.get('receiver_id');

        let lic: string = "";
        let mail: string = "N/A";

        const url = request.url;
        if (url.indexOf("disable") > 0) {
            return Response.json({ key: "ok" });
        }

        if (receiver_id !== null && item_number !== null && item_name !== null && payment_status === "Completed") {

            let ipn_url: string = "https://ipnpb.paypal.com/cgi-bin/webscr";

            const sand = process.env.PAYPAL_SANDBOX_RECEIVER_ID;
            if (receiver_id === sand) {
                ipn_url = "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr";
            }
            
            const res = await fetch(ipn_url,
                {
                    method: 'POST',
                    body: "cmd=_notify-validate&" + text
                });

            let data2: string = "err";
            if (res.status === 200) {
                data2 = await res.text();
            }

            let stat: string = "";

            if (data2.indexOf("VERIFIED") >= 0) {
                let k2: string = "order-" + item_number;
                let lic2: string | null = await kv.get(k2);
                if (lic2 !== null) {
                    lic = lic2!;
                    stat = "1";
                }
                else {
                    let ty: string = "key1-";
                    let idx: string = "idx1";

                    if (item_name.indexOf("2-year") >= 0) {
                        ty = "key2-";
                        idx = "idx2";
                    }
                    else if (item_name.indexOf("perpetual") >= 0) {
                        ty = "key3-";
                        idx = "idx3";
                    }
                    else if (item_name.indexOf("1-year") >= 0) {
                        ty = "key1-";
                        idx = "idx1";
                    }

                    let nb0: string = "0";
                    let nb: number = 0;

                    let myVar: string | null = await kv.get(idx);
                    if (myVar !== null) {
                        nb0 = myVar!;
                        nb = parseInt(nb0);
                    }

                    let nb3: number = nb % 20;
                    if (nb3 <= 0) {
                        nb3 = 1;
                    }

                    let k: string = ty + nb3.toString();
                    myVar = await kv.get(k);
                    if (myVar !== null) {
                        lic = myVar!;

                        let dt1: Date = new Date();
                        let dt2: Date = new Date(2024, 1, 1);
                        let t: number = dt1.getTime() - dt2.getTime();
                        lic += Math.ceil(t / 1000 / 60 / 60 / 24).toString(16).toUpperCase();
                    }

                    k = "order-" + item_number;
                    await kv.set(k, lic);
                    await kv.set(idx, nb + 1);

                    if (payer_email) {
                        const { data, error } = await resend.emails.send({
                            from: 'sales@photonest.io',
                            to: payer_email,
                            subject: "PhotoNest License",
                            text: 'Order-id: ' + item_number + '\r\nLicense: ' + lic
                        });

                        if (error) {
                            mail = "err";
                        }
                        else {
                            mail = "ok";
                        }
                    }
                }
            }

            if (stat === "") {
                const { data, error } = await resend.emails.send({
                    from: 'sales@photonest.io',
                    to: 'zhenxiufeng@zohomail.com',
                    subject: "paypal-notify: " + data2,
                    text: 'Order-id: ' + item_number + '\r\nLicense: ' + lic + '\r\nmailto: ' + payer_email + ', ' + mail
                });
                if (error) {
                    mail = "err";
                }
            }

        }

    } catch (error) {
    }

    return Response.json({ key: "ok" });
}