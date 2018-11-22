import {Observable} from 'rxjs/Observable';
import {Match} from './../../matches/shared/match.model';
import {Http} from '@angular/http';
import {Player} from './player.model';
import {Injectable} from '@angular/core';
import {BaseApiService} from "../../core/shared/base-api.service";
import {GoogleAuthService} from 'app/auth/shared/google-auth.service';
import {of} from "rxjs";


@Injectable()
export class PlayerService extends BaseApiService {

  constructor(private http: Http, protected googleAuthService: GoogleAuthService) {
    super(googleAuthService);
  }

  getPlayers(leagueId: string): Promise<Player[]> {
    let url = `${this.url}/leagues/${leagueId}/players`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Player[])
      .catch(this.handleError);
  }

  getPlayer(id: string): Promise<Player> {
    let url = `${this.url}/players/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Player)
      .catch(this.handleError);
  }

  getActivePlayersCount(leagueId: string): Promise<number> {
    let url = `${this.url}/leagues/${leagueId}/active-players-count`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as number)
      .catch(this.handleError);
  }

  addPlayer(leagueId: string, player: Player): Promise<Player> {
    let url = `${this.url}/leagues/${leagueId}/players`;
    return this.http.post(url, JSON.stringify(player), { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as Player)
      .catch(this.handleError);
  }

  getRanking(leagueId: string): Promise<Player[]> {
    let url = `${this.url}/leagues/${leagueId}/players/ranking`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Player[])
      .catch(this.handleError);
  }

  delete(leagueId: string, playerId: string): Promise<boolean> {
    let url = `${this.url}/leagues/${leagueId}/players/${playerId}`;
    return this.http.delete(url, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  update(leagueId: string, player: Player): Promise<Player> {
    let url = `${this.url}/leagues/${leagueId}/players/${player.id}`;
    return this.http.put(url, JSON.stringify(player), { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as Player)
      .catch(this.handleError);
  }

  getMatchForecast(playerId: string, opponentId: string): Promise<Match[]> {
    let url = `${this.url}/players/${playerId}/match-forecast/${opponentId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match[])
      .catch(this.handleError);
  }

  findByUsername(leagueId: string, username: string): Observable<Player[]> {
    let url = `${this.url}/leagues/${leagueId}/players/find-by-username?username=${username}`;
    return this.http.get(url)
      .map(response => response.json() as Player[])
      .catch(this.handleValidationError);
  }

  findActiveByUsername(leagueId: string, username: string): Observable<Player[]> {
    let url = `${this.url}/leagues/${leagueId}/players/find-active-by-username?username=${username}`;
    return this.http.get(url)
      .map(response => response.json() as Player[])
      .catch(this.handleValidationError);
  }

  private handleValidationError(): Observable<any> {
    return of([]);
  }
}
