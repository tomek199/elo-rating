import { Injectable } from '@angular/core';
import {BaseApiService} from "../../core/shared/base-api.service";
import {Http} from "@angular/http";
import {GoogleAuthService} from "../../auth/shared/google-auth.service";
import {OpponentStats} from "./opponent-stats.model";

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
}
