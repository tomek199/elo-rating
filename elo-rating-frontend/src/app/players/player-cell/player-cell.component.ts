import {PlayerService} from './../shared/player.service';
import {Player} from './../shared/player.model';
import {Match} from './../../matches/shared/match.model';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-cell',
  templateUrl: './player-cell.component.html',
  styleUrls: ['./player-cell.component.css']
})
export class PlayerCellComponent implements OnInit {
  @Input() match: Match;
  @Input() player: Player;
  @Input() currentPlayerId: string;
  forecast: Match[];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

  isCurrent(): boolean {
    if (this.player)
      return this.currentPlayerId && this.currentPlayerId == this.player.id;
    else
      return false;
  }

  getPlayerType(): string {
    if (this.player == undefined)
      return 'deleted';
    else if (this.isCurrent())
      return 'current';
    else if (this.player.active == false)
      return 'disabled';
    else
      return 'default';
  }

  getRating(): number | string {
    if (this.match && this.player) {
      if (this.player)
        return this.match.ratings[this.player.id];
      else
        return this.match.ratings['']
    }
    return ''
  }

  getDelta(): number {
    let playerCmp, sign
    if (this.match.playerOne) {
      playerCmp = this.match.playerOne
      sign = 1
    } else {
      playerCmp = this.match.playerTwo
      sign = -1
    }
    if (this.match.ratingDelta && this.player && playerCmp) {
      if (this.player.id != playerCmp.id) {
        sign = sign * -1
      }
      return this.match.ratingDelta * sign;
    }
    return 0;
  }

  private getOpponentId(): string {
    return this.player.id == this.match.playerOne.id
      ? this.match.playerTwo.id
      : this.match.playerOne.id;
  }

  getForecast() {
    this.forecast = undefined;
    this.playerService.getMatchForecast(this.player.id, this.getOpponentId())
      .then(matches => {
        this.forecast = matches;
      });
  }

  getMatchScore(match: Match) {
    let firstScore = match.scores[this.player.id];
    let secondScore = match.scores[this.getOpponentId()];
    return `${firstScore} : ${secondScore}`;
  }

  showImage(player: Player): boolean {
    return player != undefined && player.user != undefined && !this.match.completed;
  }
}
