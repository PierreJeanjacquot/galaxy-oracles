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
  console.log(deployTaskid);

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Manage Oracle {oracleAppAddress}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Field</th>
              <th className="px-4 py-2 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b font-bold">Oracle CID</td>
              <td className="px-4 py-2 border-b">{oracleCid}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b font-bold">Oracle Code</td>
              <td className="px-4 py-2 border-b">{oracleCode}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b font-bold">Oracle Signer</td>
              <td className="px-4 py-2 border-b">{oracleSigner}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b font-bold">Current Price</td>
              <td className="px-4 py-2 border-b">
                {currentPrice
                  ? formatRLC(currentPrice) + " RLC"
                  : "Not available"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <label className="block mb-2">Set New Price</label>
        <div className="flex items-center">
          <input
            className="border border-gray-300 rounded p-2 mr-2"
            value={newPrice}
            onChange={e => setNewPrice(e.target.value)}
          />
          <Button
            disabled={!newPrice || !isConnected}
            onClick={onclickSetPrice}
          >
            Set Price
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ManageMyOracle;
