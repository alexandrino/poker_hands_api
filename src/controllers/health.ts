import { Request, Response } from "express";

class HealthController {
  public check(req: Request, res: Response) {
    return res.json({ status: "UP" });
  }
}

export const healthController = new HealthController();
