import { useMatch } from "react-router-dom";
import RunOracle from "../components/RunOracle";

function Oracle() {
  const match = useMatch(`/oracle/:address/*`);
  const address = match?.params.address || "";

  return (
    <>
      <RunOracle app={address}></RunOracle>
    </>
  );
}
export default Oracle;
