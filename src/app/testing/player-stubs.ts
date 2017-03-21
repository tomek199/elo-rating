import { Player } from './../players/shared/player.model';
import { Injectable } from '@angular/core';

export const PLAYERS: Player[] = [
  {id: '123', username: 'Player 1', rating: 1000},
  {id: '456', username: 'Player 2', rating: 500},
  {id: '789', username: 'Player 3', rating: 1000}
]

@Injectable()
export class PlayerServiceStub {

  getPlayers(league_id: string): Promise<Player[]> {
    return Promise.resolve(PLAYERS);
  }

  getPlayer(id: string): Promise<Player> {
    return Promise.resolve(PLAYERS.find(player => player.id === id));
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