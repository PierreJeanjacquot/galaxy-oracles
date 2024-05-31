import { useState, useEffect } from "react";
import { getAppsByChecksum } from "../queries/appsByChecksum";
import { ORACLE_APP_CHECKSUM } from "../config";
import { SubgraphOracleData } from "../types";

const useOraclesList = () => {
  const [oracles, setOracles] = useState<SubgraphOracleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAppsByChecksum(ORACLE_APP_CHECKSUM);
        console.log("data", data);
        setOracles(data.apps);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  return { oracles, loading, error };
};

export default useOraclesList;
