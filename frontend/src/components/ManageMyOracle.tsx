import { useEffect, useState } from "react";
import { parseRLC, formatRLC } from "iexec/utils";
import useIExec from "../hooks/useIExec";
import { Button } from "./ui/button";
import useOracleData from "@/hooks/useOracleData";
import { parseOracleName } from "@/utils/oracle-name-helper";
import { TARGET_WORKERPOOL } from "@/utils/config";

function ManageMyOracle({ app: oracleAppAddress }: Readonly<{ app: string }>) {
  const { isConnected, iexec } = useIExec();

  const { oracle, oracleCode } = useOracleData(oracleAppAddress, {
    loadCode: true,
  });

  const [currentPrice, setCurrentPrice] = useState<string | undefined>();
  const [newPrice, setNewPrice] = useState("0");

  const { oracleSigner, deployTaskid, oracleCid } = parseOracleName(
    oracle?.name || "Loading-Loading-Loading"
  );

  const onclickSetPrice = async () => {
    if (currentPrice) {
      await iexec.order.unpublishAllApporders(oracleAppAddress);
    }
    const nextPrice = parseRLC(newPrice);
    await iexec.order
      .createApporder({
        app: oracleAppAddress,
        tag: ["tee", "scone"],
        workerpoolrestrict: TARGET_WORKERPOOL,
        appprice: nextPrice,
      })
      .then(iexec.order.signApporder)
      .then(iexec.order.publishApporder);
    setCurrentPrice(nextPrice.toString());
  };

  useEffect(() => {
    // get price
    console.log("oracleAppAddress", oracleAppAddress);
    iexec.orderbook
      .fetchAppOrderbook(oracleAppAddress, {
        workerpool: TARGET_WORKERPOOL,
        minTag: ["tee", "scone"],
      })
      .then(({ orders }) => {
        if (orders && orders[0]) {
          setCurrentPrice(orders[0].order.appprice.toString());
        }
      });
  }, [oracleAppAddress]);

  return (
    <div>
      <h2>Manage oracle {oracleAppAddress}</h2>
      <div>oracle cid: {oracleCid}</div>
      <div>oracle code: {oracleCode}</div>
      <div>oracle signer: {oracleSigner}</div>
      <p>
        Current price:{" "}
        {currentPrice ? formatRLC(currentPrice) + " RLC" : "Not available"}
      </p>
      <div>
        <input
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        ></input>
        <Button disabled={!newPrice || !isConnected} onClick={onclickSetPrice}>
          Set Price
        </Button>
      </div>
    </div>
  );
}

export default ManageMyOracle;
