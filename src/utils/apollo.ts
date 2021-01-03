import {
  ApolloLink,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export const client = new ApolloClient({
  link: ApolloLink.from([
    setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.REACT_APP_FAUNADB_SECRET}`,
      },
    })),
    new HttpLink({
      uri: 'https://graphql.fauna.com/graphql',
    }),
  ]),
  cache: new InMemoryCache(),
})
