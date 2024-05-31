import ConnectButton from "./ConnectButton";

function NavBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 3rem",
      }}
    >
      <h1 className="text-red-800">Galaxy oracles</h1>
      <div style={{ margin: "auto 0 auto auto" }}>
        <ConnectButton />
      </div>
    </div>
  );
}

export default NavBar;
