import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import useOraclesList from "../hooks/useOraclesList";
import { parseOracleName } from "../utils/oracle-name-helper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";

function UserOracles() {
  const { address } = useAccount();
  const { oracles, loading, error } = useOraclesList({ owner: address });
  const navigate = useNavigate();

  const createOracleLink = (address: string) => () => {
    navigate(`/oracle/${address}`);
  };

  const createManageOracleLink = (address: string) => () => {
    navigate(`/myoracles/${address}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your oracles</h2>
      {oracles.length > 0 ? (
        <div className="flex flex-wrap -mx-2">
          {oracles.map(oracle => {
            const { oracleCid, oracleSigner } = parseOracleName(oracle.name);
            return (
              <div key={oracle.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
                <Card className="cursor-pointer hover:shadow-lg h-full">
                  <CardHeader>
                    <CardTitle className="truncate">{oracle.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="truncate">
                      <span className="font-bold text-blue-500">Owned by:</span>{" "}
                      {oracle.owner.id}
                    </p>
                    <p className="truncate">
                      <span className="font-bold text-gray-700">Code:</span>{" "}
                      {oracleCid}
                    </p>
                    <p className="truncate">
                      <span className="font-bold text-green-500">Signer:</span>{" "}
                      {oracleSigner}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button onClick={createOracleLink(oracle.id)}>Show</Button>
                    <Button onClick={createManageOracleLink(oracle.id)}>
                      Manage
                    </Button>
                  </CardFooter>
                </Card>
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

export default UserOracles;
