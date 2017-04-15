import { Player } from './../../players/shared/player.model';
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

  getScore(index: number, player: Player): number {
    if (player) {
      return this.matches[index].scores[player.id];
    } else {
      return 0;
    }
  }

  isWinner(index: number, player: Player) {
    if (player) {
      return this.matches[index].scores[player.id] == 2;
    } else {
      return this.checkIfDeletedIsWinner(index);
    }
  }

  private checkIfDeletedIsWinner(index: number) {
    let match = this.matches[index];
    let player = [match.playerOne, match.playerTwo].find(player => player != undefined);
    if (player != undefined) {
      return match.scores[player.id] != 2;
    } else {
      return false;
    }
  }
}
