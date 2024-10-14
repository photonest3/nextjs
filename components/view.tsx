
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'

export default function View() {
  const [data, setData] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const isMounted = useRef(true);

  const searchParams = useSearchParams();

  const payer_id = searchParams.get('payer_id');
  const amt = searchParams.get('amt');
  const payer_email = searchParams.get('payer_email');
  const payment_status = searchParams.get('payment_status');

  const item_name = searchParams.get('item_name');
  const item_number = searchParams.get('item_number');
  const receiver_id = searchParams.get('receiver_id');
  const tx = searchParams.get('tx');
  const st = searchParams.get('st');
  const payer_status = searchParams.get('payer_status');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/back',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              "tx": tx,
              "st": st,
              "payer_status": payer_status,
              "payer_id": payer_id,
              "payment_status": payment_status,
              "amt": amt,
              "payer_email": payer_email,
              "item_number": item_number,
              "item_name": item_name,
              "receiver_id": receiver_id
            }
          )
        });

      if (isMounted.current) {
        if (!response.ok) {
          setError(" ");//2, url args error
        }
        else {
          const data2 = await response.json();
          if (data2.mail === "ok") {
          }
          if (data2.key === "0") {
            setError(" ");//0, db access error
          }
          else if (data2.key === "1") {
            setError(" ");//1, url args error
          } else {
            setOrder("Order-id: " + data2.order_id);
            setData("License: " + data2.key);
          }
        }
      }
    } catch (err) {
      setError(" ");//2, url args error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='mt-20 mb-20 block rounded-md  px-3 text-gray-600 outline-none  focus:outline-none md:mb-0 mytop'>
        {isLoading ? (
          <div className='tw-text-center mycenter '>Loading...</div>
        ) : error ? (
          <div className='tw-text-center mycenter '>{error}
            <br />
            Please contact us: <a href="mailto:sales@photonest.io">sales@photonest.io</a><br /><br />We will send the license to your email within 24 hours.</div>
        ) : (
          <div className='tw-text-center'>
            <div className='text-4xl font-bold tw-text-center mycenter '>Thank you for your payment.</div>
            <br />
            <div className='text-xl mycenter '> Your transaction has been completed, and a receipt for your purchase has been emailed to you.</div>
            <div className='text-xl mycenter '> Log into your PayPal account to view transaction details.</div>
            <br />
            <div className='text-xl mycenter '> {order}</div>
            <div className='text-xl mycenter '> {data}</div>
            <br />  <br />
            <div className='text-xl mycenter '>Contact Us: <a href="mailto:sales@photonest.io">[sales@photonest.io]</a></div>
          </div>
        )}
      </div>

    </div>
  );
}
