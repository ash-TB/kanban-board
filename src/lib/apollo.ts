import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP Link
const httpLink = new HttpLink({
  uri: 'https://xrusdfbrctlvqazuzvfa.hasura.us-west-2.nhost.run/v1/graphql',
  headers: {
    'x-hasura-admin-secret': "SQae9RGF;5s3Q_u'w8f3O$'zp6$gQMW&",
  },
});

// WebSocket Link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://xrusdfbrctlvqazuzvfa.hasura.us-west-2.nhost.run/v1/graphql',
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': "SQae9RGF;5s3Q_u'w8f3O$'zp6$gQMW&",
      },
    },
  })
);

// Use split to route requests to appropriate link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
