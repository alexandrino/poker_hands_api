import { Suit, Rank } from "../enums";

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface GroupCard {
  [key: string]: number;
}