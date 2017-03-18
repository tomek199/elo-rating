import { Match } from './../matches/shared/match.model';
import { Injectable } from '@angular/core';

export const MATCHES: Match[] = [
]

@Injectable()
export class MatchServiceStub {

  getMatches(league_id: string): Promise<Match[]> {
    // todo
    return Promise.resolve([]);
  }

  getMatch(id: string): Promise<Match> {
    // todo
    return Promise.resolve(new Match());
  }

  add(leagueId: string, match: Match): Promise<Match> {
    match.id = '111';
    MATCHES.push(match);
    return Promise.resolve(match);
  }

  delete(id: string): Promise<boolean> {
    MATCHES.splice(0, 1);
    return Promise.resolve(true);
  }

  update(match: Match): Promise<Match> {
    // todo
    return Promise.resolve(new Match());
  }
}