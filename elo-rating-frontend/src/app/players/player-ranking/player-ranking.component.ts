import { ActivatedRoute } from '@angular/router';
import { PlayerService } from './../shared/player.service';
import { Player } from './../shared/player.model';
import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-player-ranking',
  templateUrl: './player-ranking.component.html',
  styleUrls: ['./player-ranking.component.css']
})
export class PlayerRankingComponent implements OnChanges {
  
  @Input() leagueId: string;
  players: Player[];
  rankedPlayers: Player[];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnChanges() {
    this.players = undefined;
    this.rankedPlayers = undefined;
    this.getLeagueId();
    this.getRanking();
  }

  private getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  private getRanking() {
    this.playerService.getRanking(this.leagueId)
      .then(players => {
        this.players = players;
        this.rankedPlayers = this.players.filter(player => this.playerPlayedMatch(player));
      });
  }

  private playerPlayedMatch(player: Player): boolean {
    return player.statistics.won + player.statistics.lost > 0;
  }

  getContentType(): string {
    if (this.hasNoPlayers())
      return 'noPlayersAlert';
    else if (this.hasNoRankedPlayers())
      return 'noRankedPlayersAlert';
    else if (this.hasRankedPlayers())
      return 'rankingTable';
    else 
      return null;
  }

  private hasNoPlayers(): boolean { 
    return this.players != undefined && this.players.length == 0;
  }

  private hasNoRankedPlayers(): boolean {
    return this.rankedPlayers != undefined && this.rankedPlayers.length == 0;
  }

  private hasRankedPlayers(): boolean {
    return this.rankedPlayers != undefined && this.rankedPlayers.length > 0;
  }
}
