
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'

export default function Init() {
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const isMounted = useRef(true);

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (code == "87654321") {
        const response = await fetch('/api/init',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                "payer_id": code
              }
            )
          });

        if (isMounted.current) {
          const data2 = await response.json();
          setData(JSON.stringify(data2));
        }
      }
      else if (code == "12345678") {
        const response = await fetch('/api/it?item_name=2&code=' + code,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "PURCHASE_ID=531856641"

          });

        if (isMounted.current) {
          const data2 = await response.text();
          setData(data2);
        }
      }

    } catch (err) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>Data: {data}</div>
      )}
    </div>
  );
}