import { SubgraphOracleData } from "../types/types";
import { processRequest } from "../utils/graphql";

export const getAppsByChecksum = async (
  checksum: string
): Promise<{
  apps: SubgraphOracleData[];
}> => {
  const query = `
     {
      apps(where: { checksum: "${checksum}" } orderBy: timestamp, orderDirection: desc) {
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
