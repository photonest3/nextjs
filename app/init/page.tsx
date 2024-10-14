
'use client'

import { Suspense } from 'react'
import Init from '../../components/init'

export default function Home() {
  return (
    <div>
      <Suspense> <Init /> </Suspense>

    </div>
  );
}