import { ImportCandidate, create } from "kubo-rpc-client";
import { IPFS_GATEWAY_URL, IPFS_UPLOAD_URL } from "../utils/config";

const add = async (content: ImportCandidate): Promise<string> => {
  const ipfs = create({ url: IPFS_UPLOAD_URL });
  const uploadResult = await ipfs.add(content);
  const cid = uploadResult.cid.toString();
  const publicUrl = `${IPFS_GATEWAY_URL}/ipfs/${cid}`;

  await fetch(publicUrl, { method: "HEAD" }).then((res) => {
    if (!res.ok) {
      throw Error(`Failed to load uploaded file at ${publicUrl}`);
    }
  });
  return cid;
};

export { add };
