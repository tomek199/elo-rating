import { PLAYERS } from './../../testing/player-stubs';
import { Player } from './player.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  constructor() { }

  getPlayers(tournament_id: string): Promise<Player[]> {
    return Promise.resolve(PLAYERS);
  }

  addPlayer(tournamentId: string, player: Player): Promise<Player> {
    player.id = '111';
    player.points = 1000;
    PLAYERS.push(player);
    return Promise.resolve(player);
  }
}
