import { Request, Response } from "express";

import { evaluateHand } from "../services/hand_evaluator";
import { handSchema } from "../schemas/hand";

class PokerController {
  public hand(req: Request, res: Response) {
    const validation = handSchema.validate(req.body);
    const { error } = validation;

    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ errorMessage: message });
    }

    const { hand } = req.body;
    const rankCategory = evaluateHand(hand);

    return res.json({
      rankCategory,
      hand,
    });
  }
}

export const pokerController = new PokerController();
