export const parseOracleName = (name: string) => {
  const [oracleCid, oracleSigner, deployTaskid] = name.split("-");
  return {
    oracleCid,
    oracleSigner,
    deployTaskid,
  };
};
