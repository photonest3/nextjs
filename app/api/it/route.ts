import { Resend } from 'resend';
import * as React from 'react';
import { kv } from '@vercel/kv';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    let lic: string = "";
    try {
        const text = await request.text();
        let params = new URLSearchParams(text);
        const item_number = params.get('PURCHASE_ID');//531856641

        //const item_name = params.get('ITEM_NAME');//Easy Creator
        //const payer_email = params.get('EMAIL');
        /* 
       const PURCHASE_DATE=params.get('PURCHASE_DATE');
       const RUNNING_NO=params.get('RUNNING_NO');
       const PRODUCT_ID=params.get('PRODUCT_ID');
       const QUANTITY=params.get('QUANTITY');
       const REG_NAME=params.get('REG_NAME');
       const LASTNAME=params.get('LASTNAME');
       const FIRSTNAME=params.get('FIRSTNAME');
       const COUNTRY=params.get('COUNTRY');
       const LANGUAGE_ID=params.get('LANGUAGE_ID');
       const PRODUCT_CODE=params.get('PRODUCT_CODE');
       const PRODUCT_NAME=params.get('PRODUCT_NAME');
       const IS_TEST=params.get('IS_TEST');
       //const ADD%5BSOMEID%5D=00000000000' ;
       const ISO_CODE=params.get('ISO_CODE');
       const NLALLOW=params.get('NLALLOW'); 
           */

        //https://www.photonest.io/api/it?code=12345678&item_name=2


        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);

        const item_name = searchParams.get('item_name');
        const code = searchParams.get('code');

        if (code === "12345678") {

            let ty: string = "key1-";
            let idx: string = "idx1";

            if (item_name === '2') {
                ty = "key2-";
                idx = "idx2";
            }
            else if (item_name === '3') {
                ty = "key3-";
                idx = "idx3";
            }
            else if (item_name === '1') {
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
        }

        const myOptions = { status: 200, statusText: "OK", "Content-Type": "text/plain" };

        //url + "," + lic + "," + code + "," + item_number
        const myResponse = new Response(lic, myOptions);
        return myResponse;

    } catch (error) {
    }

    const myOptions = { status: 500, statusText: "error", "Content-Type": "text/plain" };
    const myResponse = new Response(lic, myOptions);
    return myResponse;

}