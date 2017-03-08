import { Player } from './../players/shared/player.model';
import { Injectable } from '@angular/core';

export const PLAYERS: Player[] = [
  {id: '123', username: 'Player 1', points: 1000},
  {id: '456', username: 'Player 2', points: 500},
  {id: '789', username: 'Player 3', points: 1000}
]

@Injectable()
export class PlayerServiceStub {

  getPlayers(tournament_id: string): Promise<Player[]> {
    return Promise.resolve(PLAYERS);
  }

  addPlayer(tournamentId: string, player: Player): Promise<Player> {
    player.id = '111';
    player.points = 1000;
    PLAYERS.push(player);
    return Promise.resolve(player);
  }

  delete(id: string): Promise<boolean> {
    PLAYERS.splice(0, 1);
    return Promise.resolve(true);
  }
}