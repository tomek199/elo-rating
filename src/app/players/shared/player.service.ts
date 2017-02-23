import { Player } from './player.model';
import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

  constructor() { }

  getPlayers(tournament_id: string): Promise<Player[]> {
    return undefined;
  }
}
