export type OracleProof = {
  domain: {
    name: "Galaxy Oracle";
    version: "0.0.1";
  };
  payload: {
    timestamp: number;
    payloadType: string;
    value: string;
    salt: string;
  };
  sign: string;
};

export type OracleResult = {
  oracleCid: string;
  value: number | string | boolean;
  proof: OracleProof;
  signer: string;
};

export type SubgraphOracleData = {
  id: string;
  name: string;
  owner: {
    id: string;
  };
  timestamp: string;
};
