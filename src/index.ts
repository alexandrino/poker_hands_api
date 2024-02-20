import "dotenv/config";

import { App } from "./app";

const { PORT: port = 3000 } = process.env;

new App().server.listen(port);
