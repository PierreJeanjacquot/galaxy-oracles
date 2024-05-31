import { useNavigate } from "react-router-dom";
import useIExec from "../hooks/useIExec";

function StartCreateButton() {
  const { isConnected } = useIExec();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/create");
  };

  return (
    <button disabled={!isConnected} onClick={onClick}>
      Start building
    </button>
  );
}

export default StartCreateButton;
