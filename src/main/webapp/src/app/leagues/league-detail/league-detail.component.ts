import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';
import {LeagueService} from '../shared/league.service';
import {League} from '../shared/league.model';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css']
})
export class LeagueDetailComponent implements OnInit {
  league: League;

  constructor(
    private leagueService: LeagueService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLeagueId();
  }

  getLeagueId() {
    this.route.params.map(p => p['league_id'])
      .forEach(id => this.getLeague(id));
  }

  getLeague(leagueId: string) {
    this.leagueService.getLeague(leagueId)
      .then(league => {
        this.league = league}
      );
  }

  displayWarning(): boolean {
    return this.league === null;
  }
}
