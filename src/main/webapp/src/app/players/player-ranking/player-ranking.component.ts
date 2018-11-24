import {League} from './../../leagues/shared/league.model';
import {ActivatedRoute} from '@angular/router';
import {PlayerService} from './../shared/player.service';
import {Player} from './../shared/player.model';
import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-player-ranking',
  templateUrl: './player-ranking.component.html',
  styleUrls: ['./player-ranking.component.css']
})
export class PlayerRankingComponent implements OnChanges {
  
  @Input() league: League;
  players: Player[];
  rankedPlayers: Player[];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnChanges() {
    this.players = undefined;
    this.rankedPlayers = undefined;
    this.getRanking();
  }

  private getRanking() {
    this.playerService.getRanking(this.league.id)
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

  allowDraws(): boolean {
    return this.league.settings.allowDraws;
  }
}
