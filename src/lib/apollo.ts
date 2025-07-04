/**
 * createApolloClient
 * --------------------------------------------------
 * Configures and returns an ApolloClient instance
 * for interacting with Nhost GraphQL.
 *
 * - Supports authenticated HTTP queries and mutations.
 * - Supports WebSocket subscriptions with auth.
 * - Uses split link to route subscriptions over WS
 *   and other operations over HTTP.
 */

import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { nhost } from './nhost';

export const createApolloClient = () => {
  // HTTP link for queries & mutations.
  const httpLink = new HttpLink({
    uri: nhost.graphql.getUrl(),
  });

  // WebSocket link for subscriptions.
  const wsLink = new GraphQLWsLink(
    createClient({
      url: nhost.graphql.getUrl().replace('https', 'wss'),
      connectionParams: async () => {
        const session = await nhost.auth.getSession();
        return {
          headers: {
            Authorization: session?.accessToken
              ? `Bearer ${session.accessToken}`
              : '',
          },
        };
      },
    })
  );

  // Auth link: adds Authorization header to HTTP requests.
  const authLink = setContext(async (_, { headers }) => {
    const session = await nhost.auth.getSession();
    return {
      headers: {
        ...headers,
        Authorization: session?.accessToken
          ? `Bearer ${session.accessToken}`
          : '',
      },
    };
  });

  // Split link: route subscriptions via WS, everything else via HTTP.
  const splitLink = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return (
        def.kind === 'OperationDefinition' && def.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  // Create and return Apollo Client with configured links and cache.
  return new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });
};
