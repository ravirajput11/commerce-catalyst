// src/apollo-client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { generateToken } from '@/utils/generateToken';

// const BASE_URL = 'https://api.australia-southeast1.gcp.commercetools.com/kt-demo';
const BASE_URL = 'https://api.australia-southeast1.gcp.commercetools.com/kt-demo/graphql';

// const httpLink = createHttpLink({
//   uri: `${import.meta.env.VITE_CTP_API_URL}/${
//     import.meta.env.VITE_CTP_PROJECT_KEY
//   }/graphql`,
// });

const httpLink = createHttpLink({
  uri: `${BASE_URL}`,
});

const authLink = setContext(async (_, { headers }) => {
  // Always get fresh token instead of storing it
  const token = await generateToken();
  
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

