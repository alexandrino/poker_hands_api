import "dotenv/config";

import { App } from "./app";
import { logger } from "./utils/logger";

const { PORT: port = 3000 } = process.env;

new App().server.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
