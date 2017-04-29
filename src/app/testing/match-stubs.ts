import { Player } from './../players/shared/player.model';
import { PLAYERS } from './player-stubs';
import { Match } from './../matches/shared/match.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MatchServiceStub {

  getMatches(league_id: string): Promise<Match[]> {
    return Promise.resolve(MATCHES);
  }

  getPlayerMatches(playerId: string, sort?: string): Promise<Match[]> {
    let matches = MATCHES.filter(match => this.hasPlayer(match, playerId));
    return Promise.resolve(matches);
  }

  private hasPlayer(match: Match, id: string) {
    return (match.playerOne != undefined && match.playerOne.id == id) 
      || (match.playerTwo != undefined && match.playerTwo.id == id);
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
    let index = MATCHES.findIndex(match => match.id == id);
    MATCHES.splice(index, 1);
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
match1.id = '111';
match1.playerOne = playerOne;
match1.playerTwo = playerTwo;
match1.scores = {'111': 2, '222': 0};
match1.ratings = {'111': 1200, '222': 1500}

let match2 = new Match();
match2.id = '222';
match2.playerOne = playerOne;
match2.playerTwo = playerTwo;
match2.scores = {'111': 1, '222': 2}; 
match2.ratings = {'111': 800, '222': 1700}

let match3 = new Match();
match3.id = '333';
match3.playerOne = playerThree;
match3.playerTwo = undefined;
match3.scores = {'333': 1, '': 2}; 
match3.ratings = {'': 1200, '333': 1000}

let match4 = new Match();
match4.id = '444';
match4.playerOne = playerOne;
match4.playerTwo = playerTwo;

let match5 = new Match();
match5.id = '555';
match5.playerOne = playerThree;
match5.playerTwo = playerOne;

let match6 = new Match();
match6.id = '666';
match6.playerOne = undefined;
match6.playerTwo = undefined;
match6.scores = {'': 2};

export const MATCHES: Match[] = [
  match1, match2, match3, match4, match5, match6
]