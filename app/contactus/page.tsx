
'use client'

import { Suspense } from 'react'
import Contact from '../../components/contact'

export default function Home() {
  return (
    <div>
      <Suspense> <Contact /> </Suspense>
    </div>
  );
}