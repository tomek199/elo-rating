import { Player } from './../players/shared/player.model';
import { PLAYERS } from './player-stubs';
import { Match } from './../matches/shared/match.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MatchServiceStub {

  getMatches(league_id: string): Promise<Match[]> {
    return Promise.resolve(MATCHES);
  }

  getPlayerMatches(playerId: string): Promise<Match[]> {
    return Promise.resolve(MATCHES);
  }

  getMatch(id: string): Promise<Match> {
    // todo
    return Promise.resolve(new Match());
  }

  add(leagueId: string, match: Match): Promise<Match> {
    match.id = '111';
    MATCHES.push(match);
    return Promise.resolve(match);
  }

  delete(id: string): Promise<boolean> {
    MATCHES.splice(0, 1);
    return Promise.resolve(true);
  }

  update(match: Match): Promise<Match> {
    // todo
    return Promise.resolve(new Match());
  }
}

let playerOne = {
  id: '111', 
  username: 'Player 1', 
  rating: 1500, 
  active: true
}

let playerTwo = {
  id: '222', 
  username: 'Player 2', 
  rating: 1000, 
  active: true
}

let playerThree = {
  id: '333', 
  username: 'Player 3', 
  rating: 1000, 
  active: false
}

let match1 = new Match();
match1.playerOne = playerOne;
match1.playerTwo = playerTwo;
match1.scores = {'111': 2, '222': 0}; 

let match2 = new Match();
match2.playerOne = playerOne;
match2.playerTwo = playerTwo;
match2.scores = {'111': 1, '222': 2}; 

let match3 = new Match();
match3.playerOne = playerThree;
match3.playerTwo = undefined;
match3.scores = {'333': 1, '': 2}; 

let match4 = new Match();
match4.playerOne = playerOne;
match4.playerTwo = playerTwo;

let match5 = new Match();
match5.playerOne = playerThree;
match5.playerTwo = playerOne;

export const MATCHES: Match[] = [
  match1, match2, match3, match4, match5  
]