import { Suit, Rank } from "../../src/enums";
import { evaluateHand } from "../../src/services/hand_evaluator";

class Card {
  suit: Suit;
  rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

describe("hand_evaluator", () => {
  test("Should return StraightFlush hand", () => {
    const straightFlush: Array<Card> = [
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Ace),
    ];
    expect(evaluateHand(straightFlush)).toBe("StraightFlush");
  });

  test("Should return fourOfAKind hand", () => {
    const fourOfAKind: Array<Card> = [
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Diamonds, Rank.Five),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Hearts, Rank.Three),
    ];
    expect(evaluateHand(fourOfAKind)).toBe("FourOfAKind");
  });

  test("Should return fullHouse hand", () => {
    const fullHouse: Array<Card> = [
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Diamonds, Rank.Five),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Three),
    ];
    expect(evaluateHand(fullHouse)).toBe("FullHouse");
  });

  test("Should return flush hand", () => {
    const flush: Array<Card> = [
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Clubs, Rank.Two),
    ];
    expect(evaluateHand(flush)).toBe("Flush");
  });

  test("Should return straight hand", () => {
    const straight: Array<Card> = [
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Jack),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Spades, Rank.Ace),
    ];
    expect(evaluateHand(straight)).toBe("Straight");
  });

  test("Should return threeOfAKind hand", () => {
    const threeOfAKind: Array<Card> = [
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Hearts, Rank.Nine),
    ];
    expect(evaluateHand(threeOfAKind)).toBe("ThreeOfAKind");
  });

  test("Should return twoPair hand", () => {
    const twoPair: Array<Card> = [
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Clubs, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ];
    expect(evaluateHand(twoPair)).toBe("TwoPair");
  });

  test("Should return onePair hand", () => {
    const onePair: Array<Card> = [
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Clubs, Rank.Eight),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Spades, Rank.Four),
    ];
    expect(evaluateHand(onePair)).toBe("OnePair");
  });

  test("Should return highCard hand", () => {
    const highCard: Array<Card> = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Diamonds, Rank.Eight),
      new Card(Suit.Hearts, Rank.Three),
    ];
    expect(evaluateHand(highCard)).toBe("HighCard");
  });
});
