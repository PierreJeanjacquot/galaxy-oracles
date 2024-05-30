import { processRequest } from "../utils/graphql";

export const getAppByChecksum = async (checksum: string) => {
  const query = `
     {
      apps(where: { checksum: "${checksum}" }) {
        id
      }
    }
  `;

  return await processRequest(query);
};
