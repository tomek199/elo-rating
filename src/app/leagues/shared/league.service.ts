import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { League } from './league.model';
import { LEAGUES } from '../../testing/league-stubs';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LeagueService {

  private url = environment.serverUrl + '/leagues';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getLeague(id: string): Promise<League> {
    let url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as League)
      .catch(this.handleError);
  }

  getAllLeagues(): Promise<League[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as League[])
      .catch(this.handleError);
  }

  create(league: League): Promise<League> {
    let url = this.url;
    return this.http.post(url, JSON.stringify(league), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as League)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
