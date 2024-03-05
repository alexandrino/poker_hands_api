import { Request, Response } from "express";

import { handSchema } from "../schemas/hand";
import { logger } from "../utils/logger";
import { evaluateAllHands } from "../services/output_hands";

class PokerController {
  public hand(req: Request, res: Response) {
    const { body } = req;
    logger.info("pokerControler.request.start", body);

    const validation = handSchema.validate(body);
    const { error } = validation;

    if (error) {
      const { message } = error.details[0];
      logger.error("pokerControler.request.validation.error", {
        message,
        body: body,
      });

      return res.status(400).json({ errorMessage: message });
    }

    try {
      const { hands } = body;
      const result = evaluateAllHands(hands);

      logger.info("pokerControler.request.success", {
        body,
        result,
      });

      return res.json({
        result,
      });
    } catch (error) {
      console.log(error);
      logger.error("pokerControler.request.exception", {
        error,
        body,
      });
      return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
  }
}

export const pokerController = new PokerController();
