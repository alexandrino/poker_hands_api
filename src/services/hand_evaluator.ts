import { Card, GroupCard } from "../interfaces/card";
import { HandRank } from "../enums";

/**
 * Evaluates a poker hand and returns its rank.
 * @param hand The array of cards representing the hand.
 * @returns The rank of the hand.
 */
const evaluateHand = (hand: Array<Card>): HandRank => {
  if (isStraightFlush(hand)) {
    return HandRank.StraightFlush;
  }

  if (isFourOfAKind(hand)) {
    return HandRank.FourOfAKind;
  }

  if (isFullHouse(hand)) {
    return HandRank.FullHouse;
  }

  if (isFlush(hand)) {
    return HandRank.Flush;
  }

  if (isStraight(hand)) {
    return HandRank.Straight;
  }

  if (isThreeOfAKind(hand)) {
    return HandRank.ThreeOfAKind;
  }

  if (isTwoPair(hand)) {
    return HandRank.TwoPair;
  }

  if (isOnePair(hand)) {
    return HandRank.OnePair;
  }

  return HandRank.HighCard;
};

/*
 * A Straight Flush is a hand that contains five cards of sequential rank, all of the same suit
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isStraightFlush = (hand: Array<Card>): boolean => {
  return isFlush(hand) && isStraight(hand);
};

/*
 * A Flush is a hand that contains five cards all of the same suit, not all of sequential rank
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isFlush = (hand: Array<Card>): boolean => {
  return Object.keys(groupCards(hand, "suit")).length === 1;
};

/*
 * A straight is a hand that contains five cards of sequential rank, not all of the same suit
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isStraight = (hand: Array<Card>): boolean => {
  const normalizedHand = normalizeHand(hand);

  const sorted = normalizedHand.sort((card1, card2) => card2.rank - card1.rank);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1].rank !== sorted[i].rank + 1) {
      return false;
    }
  }
  return true;
};

/*
 * A Four Of A Kind is a hand that contains four cards of one rank and one card of another rank
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isFourOfAKind = (hand: Array<Card>): boolean => {
  return cardsOfAKind(hand, 4, 2);
};

/**
 * Groups the cards in a hand based on the specified group type.
 * @param hand - The array of cards in the hand.
 * @param groupType - The type of grouping to be performed. Defaults to "rank".
 * @returns An object representing the grouped cards.
 */
const groupCards = (hand: Array<Card>, groupType: string = "rank") => {
  return hand.reduce((prev: GroupCard, curr: Card) => {
    const key = groupType === "rank" ? curr.rank : curr.suit;
    const accHand = prev[key];
    return accHand ? { ...prev, [key]: accHand + 1 } : { ...prev, [key]: 1 };
  }, {});
};

/*
 * In a Full House, there's a hand that contains three cards of one rank and two cards of another rank
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isFullHouse = (hand: Array<Card>): boolean => {
  return cardsOfAKind(hand, 3, 2);
};

/*
 * A Three Of A Kind is a hand that contains three cards of one rank and two cards of two other ranks
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isThreeOfAKind = (hand: Array<Card>): boolean => {
  return cardsOfAKind(hand, 3, 3);
};

/*
 * Two pair is a hand that contains two cards of one rank, two cards of another rank and one card of a third rank
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isTwoPair = (hand: Array<Card>): boolean => {
  return cardsOfAKind(hand, 2, 3);
};

/*
 * Is a hand that contains two cards of one rank and three cards of three other ranks
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {boolean}
 */
const isOnePair = (hand: Array<Card>): boolean => {
  return cardsOfAKind(hand, 2, 4);
};

/*
 * Check if the hand contains cards of a kind
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @param {Number} maxKind The number of cards of a kind
 * @param {Number} minLength The number of different cards of a kind
 * @return {boolean}
 */
const cardsOfAKind = (
  hand: Array<Card>,
  maxKind: number,
  minLength: number
) => {
  const group = groupCards(hand);
  const keys = Object.keys(group);

  if (keys.length !== minLength) {
    return false;
  }

  for (let i = 0; i < keys.length; i++) {
    const suit = keys[i];
    if (group[suit] === maxKind) {
      return true;
    }
  }
  return false;
};

/*
 * Normalize the hand to be evaluated converting the rank to a number
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {Array<rank: number, suit: string>}
 */
const normalizeHand = (hand: Array<Card>) => {
  return hand.map((card: Card) => {
    if (card.rank === "J") {
      return { ...card, rank: 11 };
    }
    if (card.rank === "Q") {
      return { ...card, rank: 12 };
    }
    if (card.rank === "K") {
      return { ...card, rank: 13 };
    }
    if (card.rank === "A") {
      return { ...card, rank: 14 };
    }

    return {
      suit: card.suit,
      rank: Number(card.rank),
    };
  });
};

export { evaluateHand };
