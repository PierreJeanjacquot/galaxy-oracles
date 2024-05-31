import { SubgraphOracleData } from "../types/types";
import { processRequest } from "../utils/graphql";

export const getAppByAddress = async (
  address: string
): Promise<{
  app: SubgraphOracleData;
}> => {
  const query = `
     {
      app(id: "${address.toLowerCase()}") {
        id
        name
        owner {
          id
        }
        timestamp
      }
    }
  `;

  return await processRequest(query);
};
