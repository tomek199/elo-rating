import { PlayerService } from './../shared/player.service';
import { OpponentStats } from './../shared/opponent-stats.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-opponents',
  templateUrl: './player-opponents.component.html',
  styleUrls: ['./player-opponents.component.css']
})
export class PlayerOpponentsComponent implements OnInit {
  @Input() playerId;
  opponentsStats: OpponentStats[];
  order: string = 'won';
  reverse: boolean = true;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayer();
  }

  private getPlayer() {
    this.playerService.getOpponentsStats(this.playerId)
      .then(opponentsStats => this.opponentsStats = opponentsStats);
  }

  setOrder(value: string) {
    console.log("value:" + value);
    console.log("order:" + this.order);
    // console.log("reverse:")
    if (this.order === value) {
      this.reverse = !this.reverse;
    } else {
      this.reverse = true;
    }
    this.order = value;
  }
}
