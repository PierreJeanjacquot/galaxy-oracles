import { useEffect, useState } from "react";

import useIExec from "./hooks/useIExec";
import { OracleProof } from "./types";
import { getOracleProofFromTask } from "./services/oracle-proof";

function RunOracle({ app: oracleAppAddress }: Readonly<{ app: string }>) {
  const { isConnected, iexec } = useIExec();

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [dealid, setDealid] = useState<string | undefined>();
  const [taskid, setTaskid] = useState<string | undefined>();
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskFailed, setTaskFailed] = useState(false);

  const [taskStatus, setTaskStatus] = useState<string | undefined>();
  const [oracleRunError, setOracleRunError] = useState<string | undefined>();
  const [proof, setProof] = useState<OracleProof | undefined>();

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
        setOracleRunError(undefined);
        setProof(undefined);

        setStatusMessage("Fetching orders");

        const requester = await iexec.wallet.getAddress();
        const TAG = ["tee", "scone"];
        // fetch apporder
        const { orders: apporders } = await iexec.orderbook.fetchAppOrderbook(
          oracleAppAddress,
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
            app: oracleAppAddress,
            category: workerpoolorder.category,
            volume: 1,
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
            getOracleProofFromTask(taskid)
              .then((oracleProof) => {
                if (!abort) {
                  setProof(oracleProof);
                }
              })
              .catch((e) => {
                console.error(e);
                if (!abort) {
                  setOracleRunError(`Something went wrong: ${e.message}`);
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
      <h2>Run oracle {oracleAppAddress}</h2>
      <button disabled={disabled} onClick={onclickRun}>
        {isCreatingTask && statusMessage ? statusMessage : "Run oracle"}
      </button>
      <p>{taskid && `Oracle task running ${taskid} ${taskStatus}`}</p>
      <p>{oracleRunError}</p>
      {proof && (
        <>
          <p>Oracle proof generated 🎉</p>
          <div>{JSON.stringify(proof, null, 2)}</div>
        </>
      )}
      {taskid && taskCompleted && (
        <button onClick={onClickDownload}>Download oracle report</button>
      )}
    </div>
  );
}

export default RunOracle;
