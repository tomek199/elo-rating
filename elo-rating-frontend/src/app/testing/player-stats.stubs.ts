import {Injectable} from "@angular/core";
import {OpponentStats} from "../players/shared/opponent-stats.model";
import {RatingHistory} from "../players/shared/rating-history.model";
import {MATCHES_STATS, RATING_HISTORY} from "./data/player-stats";
import {PlayerMatchesStats} from "../players/shared/player-matches-stats.model";

@Injectable()
export class PlayerStatsServiceStub {

  getOpponentsStats(playerId: string): Promise<OpponentStats[]> {
    // TODO create mock data for opponents stats
    return Promise.resolve(null);
  }

  getPlayerRatingHistory(playerId: string, from?: Date, to?: Date): Promise<RatingHistory[]> {
    return Promise.resolve(RATING_HISTORY);
  }

  getPlayerMatchesStats(playerId: string): Promise<PlayerMatchesStats> {
    return Promise.resolve(MATCHES_STATS);
  }
}
