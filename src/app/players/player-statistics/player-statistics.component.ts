import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.css']
})
export class PlayerStatisticsComponent implements OnInit {
  @Input() leagueId: string;
  @Input() playerId: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayerId();
  }

  getLeagueId() {
    if (!this.leagueId) {
      this.route.params.map(param => param['league_id'])
        .forEach(league_id => this.leagueId = league_id);
    }
  }

  getPlayerId() {
    if (!this.playerId) {
      this.route.params.map(param => param['player_id'])
        .forEach(player_id => this.playerId = player_id);
    }
  }

}
