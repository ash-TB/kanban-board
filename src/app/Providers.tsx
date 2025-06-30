// src/app/Providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client'
import { NhostReactProvider } from '@nhost/nextjs'
import { client } from '@/lib/apollo'
import { nhost } from '@/lib/nhost'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NhostReactProvider nhost={nhost}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </NhostReactProvider>
  )
}
