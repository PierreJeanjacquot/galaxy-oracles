import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import useIExec from "../hooks/useIExec";
import { add } from "../services/ipfs";
import JSZip from "jszip";

function CreateOracle() {
  const { address } = useAccount();
  const { isConnected, iexec } = useIExec();

  const [oracleCode, setOracleCode] = useState("(() => 42)();");

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [dealid, setDealid] = useState<string | undefined>();
  const [taskid, setTaskid] = useState<string | undefined>();
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskFailed, setTaskFailed] = useState(false);

  const [taskStatus, setTaskStatus] = useState<string | undefined>();
  const [deploymentError, setDeploymentError] = useState<string | undefined>();
  const [deployedAddress, setDeployedAddress] = useState<string | undefined>();

  const taskRunning = !!taskid && !taskFailed && !taskCompleted;
  const disabled = !isConnected || isCreatingTask || taskRunning;

  const onclickRun = async () => {
    if (!disabled && iexec) {
      try {
        setIsCreatingTask(true);
        setDealid(undefined);
        setTaskid(undefined);
        setTaskCompleted(false);
        setTaskFailed(false);
        setDeploymentError(undefined);
        setDeployedAddress(undefined);

        setStatusMessage("Uploading code");

        await add(oracleCode);

        const oracleCid = await add(oracleCode);

        setStatusMessage("Fetching orders");

        const requester = await iexec.wallet.getAddress();
        const APP = "galaxy-oracle-deployer.apps.iexec.eth";
        const TAG = ["tee", "scone"];
        // fetch apporder
        const { orders: apporders } = await iexec.orderbook.fetchAppOrderbook(
          APP,
          {
            requester,
            workerpool: "debug-v8-bellecour.main.pools.iexec.eth", // run on debug pool
            maxTag: TAG,
          }
        );
        const apporder = apporders[0]?.order;
        if (!apporder) {
          throw Error("Missing apporder");
        }
        // fetch workerpoolorder
        const { orders: workerpoolorders } =
          await iexec.orderbook.fetchWorkerpoolOrderbook({
            workerpool: "debug-v8-bellecour.main.pools.iexec.eth", // run on debug pool
            requester,
            minTag: TAG, // find orders that provide at least tee scone
          });
        const workerpoolorder = workerpoolorders[0]?.order;
        if (!workerpoolorder) {
          throw Error("Missing workerpoolorder");
        }
        // create requestorder
        setStatusMessage("Creating request order");
        const requestorder = await iexec.order
          .createRequestorder({
            app: APP,
            category: workerpoolorder.category,
            volume: 1,
            params: {
              iexec_args: `${oracleCid} ${address}`, // pass the args to the app
            },
          })
          .then(iexec.order.signRequestorder);
        // matching the orders creates a deal
        setStatusMessage("Creating a deal onchain");
        const { dealid } = await iexec.order.matchOrders({
          apporder,
          workerpoolorder,
          requestorder,
        });
        setStatusMessage("Task created");
        setDealid(dealid);
        // the taskid is derived from the dealid ond the index of the task
        const taskId = await iexec.deal.computeTaskId(dealid, 0);
        setTaskid(taskId);
      } catch (e) {
        console.error(e);
      }
      setIsCreatingTask(false);
      setStatusMessage("");
    }
  };

  const onClickDownload = async () => {
    if (taskid && taskCompleted && iexec) {
      iexec.task
        .fetchResults(taskid)
        .then((res) => res.blob())
        .then((blob) => {
          // download blob
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `${taskid}.zip`;
          document.body.appendChild(link);
          link.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );
          document.body.removeChild(link);
        });
    }
  };

  useEffect(() => {
    if (iexec && taskid && dealid) {
      let abort = false;
      let abortTaskObservableSubscription: (() => void) | undefined;
      iexec.task.obsTask(taskid, { dealid }).then((taskObservable) => {
        abortTaskObservableSubscription = taskObservable.subscribe({
          complete: () => {
            setTaskCompleted(true);
            // fetch
            iexec.task
              .fetchResults(taskid)
              .then((res) => res.arrayBuffer())
              .then((buffer) => new JSZip().loadAsync(buffer))
              .then((zip) => {
                const deployedJsonFile = zip.file("deployed.json");
                if (deployedJsonFile) {
                  deployedJsonFile.async("string").then((deployedJson) => {
                    console.log("deployedJson", deployedJson);
                    const deployed = JSON.parse(deployedJson);
                    if (deployed.error) {
                      throw Error(
                        `An error occurred in the deployer app: ${deployed.error}`
                      );
                    }
                    if (deployed.address && !abort) {
                      setDeployedAddress(deployed.address);
                    }
                  });
                } else {
                  throw Error("No deployed.json in task result");
                }
              })
              .catch((e) => {
                console.error(e);
                if (!abort) {
                  setDeploymentError(`Something went wrong: ${e.message}`);
                }
              });
          },
          next: ({ task }) => setTaskStatus(task.statusName.toLowerCase()),
          error: (e) => {
            console.error(e);
          },
        });
      });
      return () => {
        // abort the subscription in the cleanup method
        if (abortTaskObservableSubscription) {
          abortTaskObservableSubscription();
        }
        abort = true;
      };
    } else {
      setTaskCompleted(false);
      setTaskStatus(undefined);
    }
  }, [iexec, taskid, dealid]);

  return (
    <div>
      <h2>Deploy your oracle</h2>
      <p>
        <label htmlFor="oracleCode">oracle code</label>
        <div>
          <textarea
            id="oracleCode"
            onChange={(e) => setOracleCode(e.target.value)}
            disabled={disabled}
          >
            {oracleCode}
          </textarea>
        </div>
      </p>
      <button disabled={disabled} onClick={onclickRun}>
        {isCreatingTask && statusMessage ? statusMessage : "Deploy oracle"}
      </button>
      <p>{taskid && `Deployment task running ${taskid} ${taskStatus}`}</p>
      <p>{deploymentError}</p>
      <p>{deployedAddress && `Oracle app deployed at ${deployedAddress} 🎉`}</p>
      {taskid && taskCompleted && (
        <button onClick={onClickDownload}>Download deployment report</button>
      )}
    </div>
  );
}

export default CreateOracle;
