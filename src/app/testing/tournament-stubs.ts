import { Injectable } from '@angular/core';
import { Tournament } from '../tournaments/shared/tournament.model';

export const TOURNAMENTS: {[id: string]: Tournament } = {
  '123': new Tournament('123', 'Tournament name'),
  '456': null
}

@Injectable()
export class TournamentServiceStub {

  getTournament(id: string): Promise<Tournament> {
    return Promise.resolve(TOURNAMENTS[id]);
  }
}