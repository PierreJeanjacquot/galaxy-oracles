import { iexec, app } from "./config.js";

const orderHashes = await iexec.order.unpublishAllApporders(app);

console.log(`unpublished orders: ${orderHashes.join(",")}`);
