import { IExec } from "iexec";
import JSZip from "jszip";
import { OracleProof, OracleResult } from "../types/types";

export const getOracleResultFromTask = async (
  taskid: string
): Promise<OracleResult> => {
  const iexec = new IExec({ ethProvider: "bellecour" });
  const zip = await iexec.task
    .fetchResults(taskid)
    .then((res) => res.arrayBuffer())
    .then((buffer) => new JSZip().loadAsync(buffer));
  const oracleJsonFile = zip.file("oracle.json");
  if (!oracleJsonFile) {
    throw Error("No oracle.json in task result");
  }
  const oracleJson = await oracleJsonFile.async("string");
  console.log("oracleJson", oracleJson);
  const oracle: OracleResult = JSON.parse(oracleJson);
  return oracle;
};

export const getOracleProofFromTask = async (
  taskid: string
): Promise<OracleProof> => {
  const oracleResult = await getOracleResultFromTask(taskid);
  return oracleResult.proof;
};
