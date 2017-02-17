import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Tournament } from './tournament.model';
import { TOURNAMENTS } from '../../testing/tournament-stubs';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TournamentService {

  private tournamentsUrl = environment.serverUrl + '/tournaments';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getTournament(id: string) {
    let url = `${this.tournamentsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Tournament)
      .catch(this.handleError);
  }

  create(tournament: Tournament) {
    let url = this.tournamentsUrl;
    return this.http.post(url, JSON.stringify(tournament), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Tournament)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
