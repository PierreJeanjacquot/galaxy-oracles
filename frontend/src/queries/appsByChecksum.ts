import { SubgraphOracleData } from "../types/types";
import { processRequest } from "../utils/graphql";

export const getAppsByChecksum = async (
  checksum: string,
  owner?: string
): Promise<{
  apps: SubgraphOracleData[];
}> => {
  const ownerClause = owner ? `owner: "${owner.toLowerCase()}"` : "";
  const query = `
     {
      apps(where: { checksum: "${checksum}" ${ownerClause}} orderBy: timestamp, orderDirection: desc) {
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
