import { MATCHES } from './../../testing/match-stubs';
import { Http, Headers } from '@angular/http';
import { environment } from './../../../environments/environment.prod';
import { Match } from './match.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MatchService {

  private url = environment.serverUrl;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getMatchById(matchId: string): Promise<Match> {
    let url = `${this.url}/matches/${matchId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match);
  }

  getMatches(leagueId: string): Promise<Match[]> {
    let url = `${this.url}/leagues/${leagueId}/matches`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match[]);
  }

  getPlayerMatches(playerId: string): Promise<Match[]> {
    let url = `${this.url}/players/${playerId}/matches`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match[]);
  }

  add(leagueId: string, match: Match): Promise<Match> {
    let url = `${this.url}/leagues/${leagueId}/matches`;
    return this.http.post(url, JSON.stringify(match), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Match)
      .catch(this.handleError);
  }

  delete(id: string): Promise<boolean> {
    let url = `${this.url}/matches/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
