import express from "express";
import { router } from "./routers";
import { limiter } from "./middlewares/ratelimit";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(limiter);
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private router() {
    this.server.use('/api', router);
    this.server.use(router);
  }
}
