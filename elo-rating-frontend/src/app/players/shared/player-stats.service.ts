import { Injectable } from '@angular/core';
import {BaseApiService} from "../../core/shared/base-api.service";
import {Http} from "@angular/http";
import {GoogleAuthService} from "../../auth/shared/google-auth.service";
import {OpponentStats} from "./opponent-stats.model";
import {Match} from "../../matches/shared/match.model";
import {RatingHistory} from "./rating-history.model";
import {PlayerMatchesStats} from "./player-matches-stats.model";

@Injectable()
export class PlayerStatsService extends BaseApiService {

  constructor(private http: Http, protected googleAuthService: GoogleAuthService) {
    super(googleAuthService);
  }

  getOpponentsStats(playerId: string): Promise<OpponentStats[]> {
    let url = `${this.url}/players/${playerId}/opponents`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as OpponentStats[])
      .catch(this.handleError);
  }

  getPlayerRatingHistory(playerId: string, from?: Date, to?: Date): Promise<RatingHistory[]> {
    let url = `${this.url}/players/${playerId}/rating-history`;
    if (from) {
      url += `?from=${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`;
      if (to) {
        url += `&to=${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`;
      }
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as RatingHistory[]);
  }

  getPlayerMatchesStats(playerId: string): Promise<PlayerMatchesStats> {
    let url = `${this.url}/players/${playerId}/matches-stats`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as PlayerMatchesStats);
  }
}
