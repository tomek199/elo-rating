import { Player } from './../players/shared/player.model';
import { PlayerStats } from './../players/shared/playerStats.model';
import { Injectable, OnInit, Component, Input } from '@angular/core';

export const PLAYERS: Player[] = [
  { id: '123', username: 'Player 1', rating: 1000, active: true },
  { id: '456', username: 'Player 2', rating: 500, active: true },
  { id: '789', username: 'Player 3', rating: 1200, active: true },
  { id: '987', username: 'Player 4', rating: 2100, active: false },
  { id: '654', username: 'Player 5', rating: 700, active: false },

]

export function getPlayersStats(): Map<string, PlayerStats> {
  let playersStats = new Map<string, PlayerStats>();
  playersStats.set('123', {id: '123', username: 'Player 1', rating: 1000, active: true, wins: 11, loses: 1});
  playersStats.set('456', { id: '456', username: 'Player 2', rating: 500, active: true, wins: 12, loses: 2 });
  playersStats.set('789', { id: '789', username: 'Player 3', rating: 1200, active: true, wins: 13, loses: 3 });
  playersStats.set('987', { id: '987', username: 'Player 4', rating: 2100, active: false, wins: 14, loses: 4 });

  return playersStats;
};

export const PLAYERS_STATS = this.getPlayersStats();

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