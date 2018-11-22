import {PlayerStats} from "./player-stats.model";

export class PlayerMatchesStats extends PlayerStats {
  setsWon: number;
  setsLost: number;
  maxRating: number;
  minRating: number;
  maxRatingDate: Date;
  minRatingDate: Date;
}
