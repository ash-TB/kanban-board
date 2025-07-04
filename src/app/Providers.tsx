'use client'

import { ApolloProvider } from '@apollo/client'
import { NhostProvider } from '@nhost/nextjs'
import { nhost } from '@/lib/nhost'
import { createApolloClient } from '@/lib/apollo'

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = createApolloClient()

  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </NhostProvider>
  )
}
