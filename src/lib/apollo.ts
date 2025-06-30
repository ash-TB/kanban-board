import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { nhost } from './nhost'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://xrusdfbrctlvqazuzvfa.hasura.us-west-2.nhost.run/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'SQae9RGF;5s3Q_u\'w8f3O$\'zp6$gQMW&',
    },
  }),
  cache: new InMemoryCache(),
});