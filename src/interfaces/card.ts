import { Suit, Rank, HandRank, HandRankLevel } from "../enums";

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface GroupCard {
  [key: string]: number;
}

export interface Hand {
  cards: Array<Card>;
}

export interface EvaluatedHand {
  hank: HandRank;
  hand: Hand;
  hankLevel: HandRankLevel;
}
