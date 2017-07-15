import { PLAYERS, PLAYERS_STATS } from './data/players';
import { Player } from './../players/shared/player.model';
import { PlayerStats } from './../players/shared/playerStats.model';
import { Injectable, OnInit, Component, Input } from '@angular/core';

@Injectable()
export class PlayerServiceStub {

  getPlayers(league_id: string): Promise<Player[]> {
    return Promise.resolve(PLAYERS);
  }

  getPlayer(id: string): Promise<Player> {
    return Promise.resolve(PLAYERS.find(player => player.id === id));
  }

  getRanking(leagueId: string): Promise<Player[]> {
    return Promise.resolve(PLAYERS
      .sort((playerOne, playerTwo) => playerTwo.rating - playerOne.rating)
      .filter(player => player.active == true));
  }

  getPlayerStats(playerId: string): Promise<Map<string, PlayerStats>> {
    return Promise.resolve(PLAYERS_STATS);
  }

  addPlayer(leagueId: string, player: Player): Promise<Player> {
    player.id = '111';
    player.rating = 1000;
    PLAYERS.push(player);
    return Promise.resolve(player);
  }

  delete(id: string): Promise<boolean> {
    PLAYERS.splice(0, 1);
    return Promise.resolve(true);
  }

  update(player: Player): Promise<Player> {
    let playerToUpdate = PLAYERS.find(p => p.id == player.id)
    playerToUpdate.username = player.username;
    playerToUpdate.rating = player.rating;
    return Promise.resolve(playerToUpdate);
  }
}

@Component({
  selector: 'app-player-matches',
  template: ''
})
export class PlayerMatchesStubComponent implements OnInit {
  @Input() leagueId: string;
  @Input() playerId: string;

  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'app-player-statistics',
  template: ''
})
export class PlayerStatisticsStubComponent implements OnInit {
  @Input() leagueId: string;
  @Input() playerId: string;

  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'app-player-ranking',
  template: ''
})
export class PlayerRankingStubComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}