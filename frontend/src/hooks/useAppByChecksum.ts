import { useState, useEffect } from "react";
import { getAppByChecksum } from "../queries/checksum";

const useAppByChecksum = (checksum: string) => {
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAppByChecksum(checksum);

        setApp(data.apps[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [checksum]);

  return { app, loading, error };
};

export default useAppByChecksum;
