import { Request, Response } from "express";

import { evaluateHand } from "../services/hand_evaluator";
import { handSchema } from "../schemas/hand";
import { logger } from "../utils/logger";

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
      const { hand } = body;
      const rankCategory = evaluateHand(hand);

      logger.info("pokerControler.request.success", {
        body,
        rankCategory,
      });
      return res.json({
        rankCategory,
        hand,
      });
    } catch (error) {
      logger.error("pokerControler.request.exception", {
        errorMessage: error,
        body,
      });
      return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
  }
}

export const pokerController = new PokerController();
