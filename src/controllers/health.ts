import { Request, Response } from "express";

import { logger } from "../utils/logger";

class HealthController {
  public check(req: Request, res: Response) {
    logger.info("healthController.request.start");
    return res.json({ status: "UP" });
  }
}

export const healthController = new HealthController();
