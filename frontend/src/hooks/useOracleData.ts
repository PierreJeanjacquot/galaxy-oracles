import { useState, useEffect } from "react";
import { SubgraphOracleData } from "../types/types";
import { getAppByAddress } from "@/queries/appByAddress";
import { parseOracleName } from "@/utils/oracle-name-helper";
import { IPFS_GATEWAY_URL } from "@/utils/config";

const useOracleData = (
  appAddress: string,
  options?: { loadCode?: boolean }
) => {
  const [oracle, setOracle] = useState<SubgraphOracleData>();
  const [oracleCode, setOracleCode] = useState<undefined | string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAppByAddress(appAddress);
        setOracle(data.app);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appAddress]);

  useEffect(() => {
    const fetchData = async () => {
      if (options?.loadCode && oracle?.name) {
        try {
          setLoading(true);
          const { oracleCid } = parseOracleName(oracle.name);
          const code = await fetch(
            `${IPFS_GATEWAY_URL}/ipfs/${oracleCid}`
          ).then((res) => res.text());
          setOracleCode(code);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [options, oracle]);

  return { oracle, oracleCode, loading, error };
};

export default useOracleData;
