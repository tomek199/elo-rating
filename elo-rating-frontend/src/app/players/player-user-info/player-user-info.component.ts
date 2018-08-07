import {Player} from './../shared/player.model';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-user-info',
  templateUrl: './player-user-info.component.html',
  styleUrls: ['./player-user-info.component.css']
})
export class PlayerUserInfoComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit() { } 

  playerHasUser(): boolean {
    return this.player != undefined && this.player.user != undefined;
  }
}
