import { Resend } from 'resend';
import * as React from 'react';
import { kv } from '@vercel/kv';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    let data2: string = "err";
    let mail: string = "N/A";
    let lic: string = "";

    try {
        const body = await request.json();

        const tx = body.tx;
        const item_name = body.item_name;
        const item_number = body.item_number;
        const payment_status = body.payment_status;
        const payer_email = body.payer_email;
        const receiver_id = body.receiver_id;
        //const payer_id = body.payer_id;
        //const amt = body.amt;

        if (tx && item_number && payment_status === "Completed" && receiver_id) {

            let pdt_url: string = "https://paypal.com/cgi-bin/webscr";
            let at: string | undefined = process.env.PAYPAL_API_KEY;

            //if (receiver_id == process.env.PAYPALL_SANDBOX_RECEIVER_ID) 
			{
                pdt_url = "https://sandbox.paypal.com/cgi-bin/webscr";
                at = process.env.PAYPAL_SANDBOX_API_KEY;
            }

            const res = await fetch(pdt_url,
                {
                    method: 'POST',
                    body: "cmd=_notify-synch&tx=" + tx + "&at=" + at
                });

            if (res.status === 200) {
                data2 = await res.text();
            }

            let stat: string = "";
            let data3: string = "synch err";
            if (data2.indexOf("SUCCESS") >= 0) {
                data3 = "SUCCESS";

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
						
						
						let dt1: Date=new Date();
						let dt2: Date=new Date(2024, 1, 1);
                        let t:number = dt1.getTime() - dt2.getTime();
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
                    subject: "paypal-back, " + data3,
                    text: 'Order-id: ' + item_number + '\r\nLicense: ' + lic + '\r\nmailto: ' + payer_email + ', ' + mail
                });

                if (error) {
                }
            }
        }

        if (lic !== "") {
            return Response.json({ key: lic, order_id: item_number, mail: mail });
        }

    } catch (error) {
    }

    return Response.json({ key: "1", order_id: "", mail: data2 });
}