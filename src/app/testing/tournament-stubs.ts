import { Injectable } from '@angular/core';
import { Tournament } from '../tournaments/shared/tournament.model';

export const TOURNAMENTS: Tournament[] = [
  {id: '123', name: 'Tournament name'}
]

@Injectable()
export class TournamentServiceStub {

  getTournament(id: string): Promise<Tournament> {
    return Promise.resolve(TOURNAMENTS.find(tournament => tournament.id === id));
  }

  create(tournament: Tournament) {
    let lastId = TOURNAMENTS[TOURNAMENTS.length - 1].id;
    tournament.id = String(+lastId + 1);
    TOURNAMENTS.push(tournament);
    return Promise.resolve(tournament);
  }
}