import {LeagueService} from './../../leagues/shared/league.service';
import {PlayerService} from './../shared/player.service';
import {OpponentStats} from './../shared/opponent-stats.model';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PlayerStatsService} from "../shared/player-stats.service";

@Component({
  selector: 'app-player-opponents',
  templateUrl: './player-opponents.component.html',
  styleUrls: ['./player-opponents.component.css']
})
export class PlayerOpponentsComponent implements OnChanges {
  @Input() playerId;
  @Input() leagueId;
  opponentsStats: OpponentStats[];
  allowDraws: boolean;
  order: string = 'total';
  reverse: boolean = true;
  showDisabled: boolean = false;


  constructor(
    private leagueService: LeagueService,
    private playerStatsService: PlayerStatsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.opponentsStats = undefined;
    this.getLeagueSettings();
    this.getStats();
  }

  private getLeagueSettings() {
    this.leagueService.getLeagueSettings(this.leagueId)
      .then(response => this.allowDraws = response.allowDraws);
  }

  private getStats() {
    this.playerStatsService.getOpponentsStats(this.playerId)
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
