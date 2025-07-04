import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { nhost } from './nhost'

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: nhost.graphql.getUrl(),
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: nhost.graphql.getUrl().replace('https', 'wss'),
      connectionParams: async () => {
        const session = await nhost.auth.getSession()
        return {
          headers: {
            Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
          },
        }
      },
    })
  )

  const authLink = setContext(async (_, { headers }) => {
    const session = await nhost.auth.getSession()
    return {
      headers: {
        ...headers,
        Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
      },
    }
  })

  const splitLink = split(
    ({ query }) => {
      const def = getMainDefinition(query)
      return def.kind === 'OperationDefinition' && def.operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  return new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  })
}
