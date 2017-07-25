import { PlayerStats } from './../shared/player-stats.model';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from './../shared/player.service';
import { Player } from './../shared/player.model';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-player-ranking',
  templateUrl: './player-ranking.component.html',
  styleUrls: ['./player-ranking.component.css']
})
export class PlayerRankingComponent implements OnInit, OnChanges {
  
  @Input() leagueId: string;
  rankedPlayers: Player[];
  rankedPlayersStats = new Map<string, PlayerStats>();

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getRanking();
  }

  ngOnChanges() {
    this.getRanking();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getRanking() {
    this.playerService.getRanking(this.leagueId)
      .then(players => {
        this.rankedPlayers = players
        this.getPlayersStats();
      }
      );
  }

  getPlayersStats() {
    for (let player of this.rankedPlayers) {
      this.playerService.getPlayerStats(player.id)
        .then(playerStats => {
          this.rankedPlayersStats.set(playerStats.id, playerStats);
        });
    }
  }

  hasRankedPlayers(): boolean {
    return this.rankedPlayers != undefined && this.rankedPlayers.length > 0;
  }

  displayAlert(): boolean {
    let display = this.rankedPlayers != undefined ? this.rankedPlayers.length == 0 : false;
    return display;
  }
}
