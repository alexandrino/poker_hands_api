export enum Suit {
  Hearts = 'Hearts',
  Diamonds = 'Diamonds',
  Clubs = 'Clubs',
  Spades = 'Spades',
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
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
  Ace = 'A',
}

export enum HandRank {
  HighCard = 'HighCard',
  OnePair = 'OnePair',
  TwoPair = 'TwoPair',
  ThreeOfAKind = 'ThreeOfAKind',
  Straight = 'Straight',
  Flush = 'Flush',
  FullHouse = 'FullHouse',
  FourOfAKind = 'FourOfAKind',
  StraightFlush = 'StraightFlush',
  RoyalFlush = 'RoyalFlush',
}