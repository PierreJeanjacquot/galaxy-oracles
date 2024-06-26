import ManageMyOracle from "@/components/ManageMyOracle";
import { useMatch } from "react-router-dom";

function ManagePage() {
  const match = useMatch(`/myoracles/:address/*`);
  const address = match?.params.address || "";

  return (
    <>
      <ManageMyOracle app={address}></ManageMyOracle>
    </>
  );
}
export default ManagePage;
