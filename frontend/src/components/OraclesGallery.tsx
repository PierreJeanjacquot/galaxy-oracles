import useOraclesList from "../hooks/useOraclesList";
import { parseOracleName } from "../utils/oracle-name-helper";

function OraclesGallery() {
  const { oracles, loading, error } = useOraclesList();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Last created oracles</h2>
      {oracles.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
          }}
        >
          {oracles.map((oracle) => {
            const { oracleCid, oracleSigner } = parseOracleName(oracle.name);
            return (
              <div key={oracle.id}>
                <p>{oracle.id}</p>
                <p>owned by {oracle.owner.id}</p>
                <p>code: {oracleCid}</p>
                <p>signer: {oracleSigner}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>So empty...</p>
      )}
    </div>
  );
}

export default OraclesGallery;
