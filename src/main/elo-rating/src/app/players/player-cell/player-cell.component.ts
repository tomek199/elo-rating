import { Player } from './../shared/player.model';
import { Match } from './../../matches/shared/match.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-cell',
  templateUrl: './player-cell.component.html',
  styleUrls: ['./player-cell.component.css']
})
export class PlayerCellComponent implements OnInit {
  @Input() match: Match;
  @Input() player: Player;
  @Input() currentPlayerId: string;

  constructor() { }

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
    if (this.match.ratingDelta && this.player && this.match.playerOne) {
      let sign;
      this.player.id == this.match.playerOne.id ? sign = 1 : sign = -1
      return this.match.ratingDelta * sign;
    }
    return 0;
  }
}
