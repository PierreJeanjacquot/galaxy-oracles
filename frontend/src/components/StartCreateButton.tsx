import { useNavigate } from "react-router-dom";
import useIExec from "../hooks/useIExec";
import { Button } from "./ui/button";

function StartCreateButton() {
  const { isConnected } = useIExec();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/create");
  };

  return (
    <Button disabled={!isConnected} onClick={onClick}>
      Start building
    </Button>
  );
}

export default StartCreateButton;
