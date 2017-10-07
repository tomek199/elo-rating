import { PlayerService } from './../shared/player.service';
import { OpponentStats } from './../shared/opponent-stats.model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-player-opponents',
  templateUrl: './player-opponents.component.html',
  styleUrls: ['./player-opponents.component.css']
})
export class PlayerOpponentsComponent implements OnInit {
  @Input() playerId;
  @Input() leagueId;
  opponentsStats: OpponentStats[];
  order: string = 'total';
  reverse: boolean = true;
  showDisabled: boolean = false;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayer();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.opponentsStats = undefined;
    this.getPlayer();
  }

  private getPlayer() {
    this.playerService.getOpponentsStats(this.playerId)
      .then(opponentsStats => this.opponentsStats = opponentsStats);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    } else {
      this.reverse = true;
    }
    this.order = value;
  }

  checkboxCheckAction() {
    this.showDisabled = !this.showDisabled;
  }
}
