import { useMatch } from "react-router-dom";
import RunOracle from "../components/RunOracle";

function Oracle() {
  const match = useMatch(`/oracles/:address/*`);
  const address = match?.params.address as string;
  return (
    <>
      <RunOracle app={address}></RunOracle>
    </>
  );
}
export default Oracle;
