
'use client'

import { Suspense } from 'react'
import View from '../../components/view'

export default function Home() {
  return (
    <div>
      <Suspense> <View /> </Suspense>

    </div>
  );
}