import { iexec, app, workerpool } from "./config.js";

const apporder = await iexec.order
  .createApporder({
    app, // replace with app address or ens
    tag: ["tee", "scone"],
    workerpoolrestrict: workerpool,
    volume: 9007199254740990,
  })
  .then((order) => iexec.order.signApporder(order));

console.log(`apporder: ${JSON.stringify(apporder, null, 2)}`);

const orderHash = await iexec.order.publishApporder(apporder);

console.log(`published orderHash: ${orderHash}`);
