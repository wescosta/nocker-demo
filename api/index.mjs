import app from "./app"
import log from "./utils/logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => log.info(`API up and running on port ${PORT}`));