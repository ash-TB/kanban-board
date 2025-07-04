/**
 * Providers.tsx
 * --------------------------------------------------
 * Wraps the application with necessary providers for:
 * - Nhost: Backend services including authentication, storage, and realtime GraphQL
 * - Apollo Client: GraphQL client for queries, mutations, and subscriptions
 *
 * This component should be placed at the root level (e.g., _app.tsx or layout.tsx)
 * to make Nhost and Apollo Client functionality available throughout the app.
 */

'use client'

import { ApolloProvider } from '@apollo/client'
import { NhostProvider } from '@nhost/nextjs'
import { nhost } from '@/lib/nhost'
import { createApolloClient } from '@/lib/apollo'

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create Apollo Client instance configured with auth and subscription support
  const client = createApolloClient()

  return (
    // NhostProvider supplies backend services (auth, storage, realtime) context
    <NhostProvider nhost={nhost}>
      {/* ApolloProvider supplies Apollo Client instance to React tree */}
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </NhostProvider>
  )
}
