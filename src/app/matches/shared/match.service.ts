import { Http, Headers } from '@angular/http';
import { environment } from './../../../environments/environment.prod';
import { Match } from './match.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MatchService {

  private url = environment.serverUrl;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  add(leagueId: string, match: Match): Promise<Match> {
    let url = `${this.url}/leagues/${leagueId}/matches`;
    return this.http.post(url, JSON.stringify(match), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Match)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
