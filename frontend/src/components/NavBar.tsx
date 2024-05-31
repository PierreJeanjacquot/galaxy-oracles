import { useNavigate } from "react-router-dom";
import ConnectButton from "./ConnectButton";

function NavBar() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 3rem",
      }}
    >
      <h1 onClick={onClick} className="text-red-800">
        Galaxy oracles
      </h1>
      <div style={{ margin: "auto 0 auto auto" }}>
        <ConnectButton />
      </div>
    </div>
  );
}

export default NavBar;
