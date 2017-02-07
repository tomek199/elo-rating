import { Injectable } from '@angular/core';
import { Tournament } from './tournament.model';
import { TOURNAMENTS } from '../../testing/tournament-stubs';

@Injectable()
export class TournamentService {

  constructor() { }

  getTournament(id: string): Promise<Tournament> {
    return Promise.resolve(TOURNAMENTS.find(tournament => tournament.id === id));
  }
}
