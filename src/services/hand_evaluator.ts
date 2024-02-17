import { Card } from "../interfaces/card";
import { HandRank } from "../enums";

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

  return HandRank.HighCard;
};


/*
 * A traight Flush is a hand that contains five cards of sequential rank, all of the same suit
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {Boolean}
 */
const isStraightFlush = (hand: Array<Card>): Boolean => {
  return isFlush(hand) && isStraight(hand);
};


/*
 * A Flush is a hand that contains five cards all of the same suit, not all of sequential rank
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {Boolean}
 */
const isFlush = (hand: Array<Card>): Boolean => {
  return Object.keys(groupCards(hand, "suit")).length === 1;
};

/*
 * A straight is a hand that contains five cards of sequential rank, not all of the same suit
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {Boolean}
 */
const isStraight = (hand: Array<Card>): Boolean => {
  const sorted = hand.sort((card1, card2) => card2.rank - card1.rank);

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
 * @return {Boolean}
 */
const isFourOfAKind = (hand: Array<Card>): Boolean => {
  return cardsOfAKind(hand, 4, 2);
};


/*
 * Group cards by a group type and count the number of ocurrences in each type
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @param {String} groupType Can be rank or suit
 * @return {Object|Hashmap} map with group and its total of ocurrences
 */
const groupCards = (hand: Array<Card>, groupType: string = "rank") => {
  return hand.reduce((prev: any, curr: any) => {
    const key = curr[groupType];
    const accHand = prev[key];
    return accHand ? { ...prev, [key]: accHand + 1 } : { ...prev, [key]: 1 };
  }, {});
};

/*
 * In a Full House, there's a hand that contains three cards of one rank and two cards of another rank
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {Boolean}
 */
const isFullHouse = (hand: Array<Card>): Boolean => {
  return cardsOfAKind(hand, 3, 2);
};

/*
 * A Three Of A Kind is a hand that contains three cards of one rank and two cards of two other ranks
 * @param {Array<Card>} hand Containg a list of cards to be evaluated
 * @return {Boolean}
 */
const isThreeOfAKind = (hand: Array<Card>): Boolean => {
  return cardsOfAKind(hand, 3, 3);
};

const cardsOfAKind = (
  hand: Array<Card>,
  maxKind: number,
  minLength: number = 2
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

export { evaluateHand };
