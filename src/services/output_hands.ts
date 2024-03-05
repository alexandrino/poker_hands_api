import { evaluateHand } from "./hand_evaluator";
import { Hand, EvaluatedHand } from "../interfaces/card";
import { HandRankLevel } from "../enums";

const evaluateAllHands = (hands: Array<Hand>) => {
  const evaluatedHands = hands.map((hand: Hand) => ({
    hank: evaluateHand(hand.cards),
    hankLevel: HandRankLevel[evaluateHand(hand.cards)],
    hand,
  }));

  const sortedList = evaluatedHands.sort(
    (a: EvaluatedHand, b: EvaluatedHand) => {
      if (a.hankLevel !== b.hankLevel) {
        return b.hankLevel - a.hankLevel;
      }
      return 0;
    }
  );
  return sortedList.map((hand: EvaluatedHand, index: number) => {
    if (index === 0) {
      return {
        hand: hand.hand,
        rank: hand.hank,
        winner: true,
      };
    }
    return {
      hand: hand.hand,
      rank: hand.hank,
    };
  });
};

export { evaluateAllHands };
