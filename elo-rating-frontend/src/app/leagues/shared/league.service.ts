import {LeagueSettings} from './league-settings';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {League} from './league.model';
import {BaseApiService} from "../../core/shared/base-api.service";


@Injectable()
export class LeagueService extends BaseApiService {

  constructor(private http: Http, protected googleAuthService: GoogleAuthService) {
    super(googleAuthService);
  }

  getLeague(id: string): Promise<League> {
    let url = `${this.url}/leagues/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as League)
      .catch(this.handleError);
  }

  getLeagueSettings(id: string): Promise<LeagueSettings> {
    let url = `${this.url}/leagues/${id}/settings`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as LeagueSettings)
      .catch(this.handleError);
  }

  getAllLeagues(): Promise<League[]> {
    let url = `${this.url}/leagues`
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as League[])
      .catch(this.handleError);
  }

  findByName(name: string): Observable<League[]> {
    let url = `${this.url}/leagues/find-by-name?name=${name}`;
    return this.http.get(url)
      .map(response => response.json() as League[]);
  }

  create(league: League): Promise<League> {
    let url = `${this.url}/leagues`;
    return this.http.post(url, JSON.stringify(league), {headers: this.generateHeaders()})
      .toPromise()
      .then(response => response.json() as League)
      .catch(this.handleError);
  }

  update(league: League): Promise<League> {
    let url = `${this.url}/leagues/${league.id}`;
    return this.http.put(url, JSON.stringify(league), {headers: this.generateHeaders()})
      .toPromise()
      .then(response => response.json() as League)
      .catch(this.handleError);
  }
}
