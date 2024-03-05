export enum Suit {
  Clubs = "Clubs",
  Diamonds = "Diamonds",
  Hearts = "Hearts",
  Spades = "Spades",
}

export enum Rank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack = "J",
  Queen = "Q",
  King = "K",
  Ace = "A",
}

export enum HandRank {
  HighCard = "HighCard",
  OnePair = "OnePair",
  TwoPair = "TwoPair",
  ThreeOfAKind = "ThreeOfAKind",
  Straight = "Straight",
  Flush = "Flush",
  FullHouse = "FullHouse",
  FourOfAKind = "FourOfAKind",
  StraightFlush = "StraightFlush",
  RoyalFlush = "RoyalFlush",
}

export enum HandRankLevel {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush,
  RoyalFlush,
}
