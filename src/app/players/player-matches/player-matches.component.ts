import { Player } from './../shared/player.model';
import { MatchService } from './../../matches/shared/match.service';
import { Match } from './../../matches/shared/match.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.css']
})
export class PlayerMatchesComponent implements OnInit {
  leagueId: string;
  playerId: string;
  matches: Match[];

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayerId();
    this.getMatches();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getPlayerId() {
    this.route.params.map(param => param['player_id'])
      .forEach(player_id => this.playerId = player_id);
  }

  getMatches() {
    this.matchService.getPlayerMatches(this.playerId)
      .then(matches => this.matches = matches);
  }

  hasMatches(): boolean {
    return (this.matches != undefined && this.matches.length > 0);
  }

  getScore(index: number, player: Player): number {
    let key = player ? player.id : '';
    return this.matches[index].scores[key];
  }

  isCurrent(player: Player): boolean {
    return player && player.id == this.playerId;
  }

  isWinner(index: number, player: Player): boolean {
    if (player && player.id == this.playerId) {
      return this.matches[index].scores[player.id] == 2;
    }
    return false;
  }

  isLooser(index: number, player: Player): boolean {
    if (player && player.id == this.playerId) {
      return this.matches[index].scores[player.id] != 2;
    }
    return false;
  }
}
