/* eslint-disable no-console */
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://thegraph.bellecour.iex.ec/subgraphs/name/bellecour/poco-v5",
  cache: new InMemoryCache(),
});

export const processRequest = async (query: string): Promise<any> => {
  try {
    const response = await client.query({
      query: gql`
        ${query}
      `,
    });

    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
