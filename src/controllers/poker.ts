import { Request, Response } from "express";


class PokerController {
  public home(req: Request, res: Response) {
    return res.json({
      response: 'ok',
    });
  }
}

export const pokerController = new PokerController();
