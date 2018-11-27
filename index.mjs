import express from "express";

import log   from "./utils/logger";
import routes from "./routes";

const app  = express();
const PORT = process.env.PORT || 3000;

app.use('/', routes);

app.listen(PORT, () => log.info(`API up and running on port ${PORT}`));