import { Injectable } from '@angular/core';
import { League } from '../leagues/shared/league.model';

export const LEAGUES: League[] = [
  {id: '123', name: 'League name'}
]

@Injectable()
export class LeagueServiceStub {

  getLeague(id: string): Promise<League> {
    return Promise.resolve(LEAGUES.find(league => league.id === id));
  }

  create(league: League) {
    let lastId = LEAGUES[LEAGUES.length - 1].id;
    league.id = String(+lastId + 1);
    LEAGUES.push(league);
    return Promise.resolve(league);
  }
}