import { MATCHES } from './data/matches';
import { Page } from './../core/utils/pagination/page.model';
import { Player } from './../players/shared/player.model';
import { PLAYERS } from './data/players';
import { Match } from './../matches/shared/match.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MatchServiceStub {

  getMatches(league_id: string): Promise<Match[]> {
    return Promise.resolve(MATCHES);
  }

  getCompletedMatches(leagueId: string, page: number, pageSize: number = 5): Promise<Page<Match>> {
    let matches = MATCHES.filter(match => match.completed == true);
    let resultPage = new Page<Match>();
    resultPage.content = matches;
    resultPage.totalElements = matches.length;
    resultPage.numberOfElements = matches.length;
    resultPage.size = pageSize;
    return Promise.resolve(resultPage);  
  }

  getMatchById(match_id: string): Promise<Match> {
    let matchFound = MATCHES.filter(match => match.id === match_id)[0];
    return Promise.resolve(matchFound);
  }

  getScheduledMatches(leagueId: string): Promise<Match[]> {
    let matches = MATCHES.filter(match => match.completed == false);
    return Promise.resolve(matches);
  }

  getPlayerMatches(playerId: string): Promise<Match[]> {
    let matches = MATCHES.filter(match => this.hasPlayer(match, playerId));
    return Promise.resolve(matches);
  }

  getPlayerCompletedMatches(playerId: string, page: number, pageSize: number = 5): Promise<Page<Match>> {
    let matches = MATCHES.filter(match => this.hasPlayer(match, playerId) && match.completed == true);
    let resultPage = new Page<Match>();
    resultPage.content = matches;
    resultPage.totalElements = matches.length;
    resultPage.numberOfElements = matches.length;
    resultPage.size = pageSize;
    return Promise.resolve(resultPage);  
  }

  getPlayerCompletedMatchesByDate(playerId: string, from?: Date, to?: Date): Promise<Match[]> {
    let matches = MATCHES.filter(match => this.hasPlayer(match, playerId) && match.completed);
    return Promise.resolve(matches);
  }

  getPlayerScheduledMatches(playerId: string): Promise<Match[]> {
    let matches = MATCHES.filter(match => this.hasPlayer(match, playerId) && match.completed == false);
    return Promise.resolve(matches);
  }

  private hasPlayer(match: Match, id: string) {
    return (match.playerOne !== undefined && match.playerOne.id === id)
      || (match.playerTwo !== undefined && match.playerTwo.id === id);
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
    let index = MATCHES.findIndex(match => match.id === id);
    MATCHES.splice(index, 1);
    return Promise.resolve(true);
  }

  update(match: Match): Promise<Match> {
    // todo
    return Promise.resolve(new Match());
  }

  revertMatch(id: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  serialize(match: Match): Match {
    let output = new Match();
    output.id = match.id;
    output.playerOne = match.playerOne;
    output.playerTwo = match.playerTwo;
    output.scores = match.scores;
    output.ratings = match.ratings;
    output.date = match.date;

    return output;
  }
}
