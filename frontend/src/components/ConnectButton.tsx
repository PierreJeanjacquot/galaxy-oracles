import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
// import the bellecour configuration
import { bellecour } from "../utils/wagmiConfig";
import { Button } from "./ui/button";

function ConnectButton() {
  const { isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // check connection and chain
  const isConnectedToBellecour = isConnected && chainId === bellecour.id;

  const onClick = isConnectedToBellecour
    ? () => disconnect()
    : () => connect({ connector: injected(), chainId: bellecour.id });

  const text = isConnectedToBellecour ? "Disconnect" : "Connect";

  return <Button onClick={onClick}>{text}</Button>;
}

export default ConnectButton;
