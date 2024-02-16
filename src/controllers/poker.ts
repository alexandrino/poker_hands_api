import { Request, Response } from "express";

import { evaluateHand } from "../services/hand_evaluator";

class PokerController {
  public hand(req: Request, res: Response) {
    const { hand } = req.body;
    const rankCategory = evaluateHand(hand);

    return res.json({
      rankCategory,
      hand,
    });
  }
}

export const pokerController = new PokerController();
