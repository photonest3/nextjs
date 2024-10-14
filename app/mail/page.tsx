
'use client'

import { Suspense } from 'react'
import Mail from '../../components/mail'

export default function Home() {
  return (
    <div>
      <Suspense> <Mail /> </Suspense>
    </div>
  );
}