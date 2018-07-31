import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Page} from './../../core/utils/pagination/page.model';
import {Http} from '@angular/http';
import {Match} from './match.model';
import {Injectable} from '@angular/core';
import {BaseApiService} from "../../core/shared/base-api.service";


@Injectable()
export class MatchService extends BaseApiService {

  constructor(private http: Http, protected googleAuthService: GoogleAuthService) { 
    super(googleAuthService);
  }

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

  getCompletedMatches(leagueId: string, page: number, pageSize: number = 5): Promise<Page<Match>> {
    let url = `${this.url}/leagues/${leagueId}/completed-matches?page=${page - 1}&pageSize=${pageSize}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Page<Match>);
  }

  getScheduledMatches(leagueId: string): Promise<Match[]> {
    let url = `${this.url}/leagues/${leagueId}/scheduled-matches?sort=asc`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match[]);
  }

  getPlayerMatches(playerId: string, sort?: string): Promise<Match[]> {
    let url = `${this.url}/players/${playerId}/matches`;
    if (sort) {
      url += `?sort=${sort}`;
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match[]);
  }

  getPlayerCompletedMatches(playerId: string, page: number, pageSize: number = 5, opponentId?: string): Promise<Page<Match>> {
    let url = `${this.url}/players/${playerId}/completed-matches`;
    if (opponentId) {
      url += `/${opponentId}`
    }
    url += `?page=${page - 1}&pageSize=${pageSize}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Page<Match>);
  }

  getPlayerCompletedMatchesByDate(playerId: string, from?: Date, to?: Date): Promise<Match[]> {
    let url = `${this.url}/players/${playerId}/completed-matches-by-date`;
    if (from) {
      url += `?from=${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}`;
      if (to) {
        url += `&to=${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}`;
      }
    }
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match[]);
  }

  getPlayerScheduledMatches(playerId: string): Promise<Match[]> {
    let url = `${this.url}/players/${playerId}/scheduled-matches?sort=asc`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Match[]);
  }

  save(leagueId: string, match: Match): Promise<Match> {
    let url = `${this.url}/leagues/${leagueId}/matches`;
    return this.http.post(url, JSON.stringify(match), { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as Match)
      .catch(this.handleError);
  }

  delete(leagueId: string, id: string): Promise<boolean> {
    let url = `${this.url}/leagues/${leagueId}/matches/${id}`;
    return this.http.delete(url, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  revertMatch(leagueId: string, id: string): Promise<boolean> {
    let url = `${this.url}/leagues/${leagueId}/matches/${id}/revert`;
    return this.http.post(url, null, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.ok)
      .catch(this.handleError);
  }

  serialize(match: Match): Match {
    let output = new Match();
    output.id = match.id;
    output.playerOne = match.playerOne;
    output.playerTwo = match.playerTwo;
    output.scores = match.scores;
    output.ratings = match.ratings;
    output.date = new Date(match.date);
    output.ratingDelta = match.ratingDelta;
    return output;
  }

  rescheduleMatches(leagueId: string, minutes: number) {
    let url = `${this.url}/league/${leagueId}/reschedule-matches/${minutes}?sort=asc`;
    return this.http.post(url, null, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as Match[])
      .catch(this.handleError);
  }

  hasRelatedMatchIncomplete(queue: Match[], index: number): boolean {
    let match = queue[index];
    return queue.slice(0, index)
                .filter(m => m.playerOne.id == match.playerOne.id 
                          || m.playerTwo.id == match.playerTwo.id
                          || m.playerOne.id == match.playerTwo.id
                          || m.playerTwo.id == match.playerOne.id).length > 0
  }
}
