import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import useOraclesList from "../hooks/useOraclesList";
import { parseOracleName } from "../utils/oracle-name-helper";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

function UserOracles() {
  const { address } = useAccount();

  const { oracles, loading, error } = useOraclesList({ owner: address });
  const navigate = useNavigate();

  const createOracleLink = (address: string) => () => {
    navigate(`/myoracles/${address}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Your oracles</h2>
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
              <Card key={oracle.id} onClick={createOracleLink(oracle.id)}>
                <CardHeader>
                  <CardTitle>{oracle.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>owned by {oracle.owner.id}</p>
                  <p>code: {oracleCid}</p>
                  <p>signer: {oracleSigner}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p>So empty...</p>
      )}
    </div>
  );
}

export default UserOracles;
