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
  playedMatches: Match[];
  scheduledMatches: Match[];

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
      .then(matches => {
        this.playedMatches = matches.filter(m => this.isComplete(m.scores));
        this.scheduledMatches = matches.filter(m => !this.isComplete(m.scores));
      });
  }

  isComplete(scores: {[id: string] : number;}): boolean {
    return Object.keys(scores).length > 0;
  }

  hasMatches(): boolean {
    return (this.hasPlayedMatches() || this.hasScheduledMatches());
  }

  hasPlayedMatches(): boolean {
    return (this.playedMatches != undefined && this.playedMatches.length > 0);    
  }

  hasScheduledMatches(): boolean {
    return (this.scheduledMatches != undefined && this.scheduledMatches.length > 0);    
  }

  getScore(index: number, player: Player): number {
    if (player) {
      return this.playedMatches[index].scores[player.id];
    } else {
      return 0;
    }
  }

  isWinner(index: number, player: Player) {
    if (player) {
      return this.playedMatches[index].scores[player.id] == 2;
    } else {
      return this.checkIfDeletedIsWinner(index);
    }
  }

  private checkIfDeletedIsWinner(index: number) {
    let match = this.playedMatches[index];
    let player = [match.playerOne, match.playerTwo].find(player => player != undefined);
    if (player != undefined) {
      return match.scores[player.id] != 2;
    } else {
      return false;
    }
  }
}
