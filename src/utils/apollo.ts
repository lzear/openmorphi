import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_FAUNADB_SECRET}`,
  },
  uri: 'https://graphql.fauna.com/graphql',
});
