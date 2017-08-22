import { Match } from './../../matches/shared/match.model';
import { PlayerService } from './../shared/player.service';
import { Player } from './../shared/player.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-forecast',
  templateUrl: './player-forecast.component.html',
  styleUrls: ['./player-forecast.component.css']
})
export class PlayerForecastComponent implements OnInit {
  @Input() leagueId;
  @Input() playerId;
  player: Player;
  opponents: Player[];
  opponentId: string;
  forecast: Match[];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayer();
    this.getOpponents();
  }

  private getPlayer() {
    this.playerService.getPlayer(this.playerId)
      .then(player => this.player = player);
  }

  private getOpponents() {
    this.playerService.getRanking(this.leagueId)
      .then(players => this.opponents = players);
  }

  isCurrentPlayer(opponentId: string): boolean {
    return opponentId == this.playerId;
  }

  isSelectedOpponent(opponentId: string): boolean {
    return this.opponentId != undefined && this.opponentId == opponentId;
  }

  hasOpponent(): boolean {
    return this.opponentId != undefined;
  }

  changeOpponent(opponentId: string) {
    if (!this.isCurrentPlayer(opponentId)) {
      this.forecast = undefined;    
      this.opponentId = opponentId;
      this.getForecast();
    }
  }

  private getForecast() {
    this.playerService.getMatchForecast(this.playerId, this.opponentId)
      .then(matches => this.forecast = matches);
  }

  hasForecast(): boolean {
    return this.forecast != undefined && this.forecast.length == 4;
  }

  getWins(): Match[] {
    return [this.forecast[0], this.forecast[1]];
  }

  getLoses(): Match[] {
    return [this.forecast[2], this.forecast[3]];
  }

  getMatchScore(match: Match): string {
    let firstScore = match.scores[match.playerOne.id];
    let secondScore = match.scores[match.playerTwo.id];
    return `${firstScore} : ${secondScore}`;
  }

  getRating(match: Match): number {
    return match.ratings[match.playerOne.id];
  }
}
