import { useState, useEffect } from "react";
import { getAppByChecksum } from "../queries/checksum";

const useAppByChecksum = (checksum: string) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAppByChecksum(checksum);
        console.log("data", data);
        setApps(data.apps); // Set all apps instead of just the first one
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [checksum]);

  return { apps, loading, error };
};

export default useAppByChecksum;
