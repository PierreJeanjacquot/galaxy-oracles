import ConnectButton from "./ConnectButton";
import IExecAccountWidget from "./IExecAccountWidget";
import CreateOracle from "./CreateOracle";
import RunOracle from "./RunOracle";
import AppChecksum from "./components/AppChecksum";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 3rem",
        }}
      >
        <h1>Galaxy oracles</h1>
        <div style={{ margin: "auto 0 auto auto" }}>
          <ConnectButton />
        </div>
      </div>
      <div style={{ padding: "1rem 3rem", display: "grid", gap: "1rem" }}>
        <IExecAccountWidget />
        <CreateOracle />
        <RunOracle app="0x4a8ED63FC766016e04E68E5E7EAC8c873742fA33" />
        <AppChecksum />
      </div>
    </div>
  );
}

export default App;
