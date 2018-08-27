import {Injectable} from "@angular/core";
import {OpponentStats} from "../players/shared/opponent-stats.model";

@Injectable()
export class PlayerStatsServiceStub {

  getOpponentsStats(playerId: string): Promise<OpponentStats[]> {
    // TODO create mock data for opponents stats
    return Promise.resolve(null);
  }
}
