import { ActivatedRoute } from '@angular/router';
import { MatchService } from './../shared/match.service';
import { Match } from './../shared/match.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  leagueId: string;
  matches: Match[];

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getMatches();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getMatches() {
    this.matchService.getMatches(this.leagueId)
      .then(matches => this.matches = matches);
  }

  hasMatches(): boolean {
    return (this.matches != undefined && this.matches.length > 0);
  }

  isWinner(score: number): boolean {
    return score == 2;
  }
}
