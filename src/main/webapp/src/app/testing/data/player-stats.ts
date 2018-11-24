import {RatingHistory} from "../../players/shared/rating-history.model";

export const RATING_HISTORY: RatingHistory[] = [
  {
    date: new Date(),
    rating: 1000,
    opponent: "Opponent 1"
  },
  {
    date: new Date(),
    rating: 1200,
    opponent: "Opponent 2"
  },
  {
    date: new Date(),
    rating: 900,
    opponent: "Opponent 3"
  },
  {
    date: new Date(),
    rating: 1100,
    opponent: "Opponent 4"
  }
];

export const MATCHES_STATS = {
  won: 2,
  lost: 3,
  draw: 1,
  setsWon: 6,
  setsLost: 8,
  maxRating: 1200,
  minRating: 900,
  maxRatingDate: new Date(),
  minRatingDate: new Date(),
};
