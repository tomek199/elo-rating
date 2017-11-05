import { LEAGUES } from './data/leagues';
import { League } from './../leagues/shared/league.model';
import { Observable } from 'rxjs/Observable';
import { Injectable, Component, OnInit, Input, OnChanges } from '@angular/core';
import { Response } from '@angular/http'
import 'rxjs/add/observable/of';

@Injectable()
export class LeagueServiceStub {

  getLeague(id: string): Promise<League> {
    let league = LEAGUES.find(league => league.id === id);
    if (league)
      return Promise.resolve(league);
    else
      return Promise.resolve(null);
  }

  getAllLeagues(): Promise<League[]> {
    return Promise.resolve(LEAGUES);
  }

  findByName(name: string): Observable<League[]> {
    return Observable.of(LEAGUES.filter(league => league.name.includes(name)));
  }

  create(league: League) {
    let lastId = LEAGUES[LEAGUES.length - 1].id;
    league.id = String(+lastId + 1);
    LEAGUES.push(league);
    return Promise.resolve(league);
  }

  update(league: League): Promise<League> {
    return Promise.resolve(league);
  }
}

@Component({
  selector: 'app-league-search',
  template: ''
})
export class LeagueSearchComponentStub implements OnInit {
  ngOnInit(): void { }
}

@Component({
  selector: 'app-league-assign',
  template: ''
})
export class LeagueAssignComponentStub implements OnChanges {
  @Input() league: League;
  ngOnChanges(): void { }
}