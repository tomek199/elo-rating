import {Observable} from 'rxjs/Observable';
import {Match} from './../matches/shared/match.model';
import {PLAYERS} from './data/players';
import {Player} from './../players/shared/player.model';
import {Component, Injectable, Input, OnChanges, OnInit} from '@angular/core';
import {of} from "rxjs";

@Injectable()
export class PlayerServiceStub {

  getPlayers(league_id: string): Promise<Player[]> {
    return Promise.resolve(PLAYERS);
  }

  getPlayer(id: string): Promise<Player> {
    return Promise.resolve(PLAYERS.find(player => player.id === id));
  }

  getActivePlayersCount(leagueId: string): Promise<number> {
    return Promise.resolve(5);
  }

  getRanking(leagueId: string): Promise<Player[]> {
    return Promise.resolve(PLAYERS
      .sort((playerOne, playerTwo) => playerTwo.rating - playerOne.rating)
      .filter(player => player.active == true));
  }

  addPlayer(leagueId: string, player: Player): Promise<Player> {
    let lastId = PLAYERS[PLAYERS.length - 1].id;
    player.id = lastId;
    player.rating = 1000;
    PLAYERS.push(player);
    return Promise.resolve(player);
  }

  delete(leagueId: string, playerId: string): Promise<boolean> {
    let index = PLAYERS.findIndex(player => player.id == playerId);
    PLAYERS.splice(index, 1);
    return Promise.resolve(true);
  }

  update(leagueId: string, player: Player): Promise<Player> {
    let playerToUpdate = new Player();
    playerToUpdate.username = player.username;
    playerToUpdate.rating = player.rating;
    playerToUpdate.active = player.active;
    return Promise.resolve(playerToUpdate);
  }

  getMatchForecast(playerId: string, opponentId: string): Promise<Match[]> {
    let player = PLAYERS.find(p => p.id == playerId);
    let opponent = PLAYERS.find(p => p.id == playerId);
    let score = [[2, 0], [2, 1], [1, 2], [0, 2]];
    let ratio = [20, 10, -10, -20];
    let matches = [];
    for(let i = 0; i < 4; i++) {
      let match = new Match();
      match.playerOne = player;
      match.playerTwo = opponent;
      match.scores = {playerId: score[i][0], opponentId: score[i][1]}
      match.ratingDelta = ratio[i];
      matches.push(match);
    }
    return Promise.resolve(matches);
  }

  findByUsername(leagueId: string, username: string): Observable<Player[]> {
    return of(PLAYERS);
  }

  findActiveByUsername(leagueId: string, username: string): Observable<Player[]> {
    return of(PLAYERS);
  }
}

@Component({
  selector: 'app-player-matches',
  template: ''
})
export class PlayerMatchesStubComponent implements OnInit {
  @Input() leagueId: string;
  @Input() playerId: string;

  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'app-player-statistics',
  template: ''
})
export class PlayerStatisticsStubComponent implements OnInit {
  @Input() leagueId: string;
  @Input() playerId: string;

  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'app-player-ranking',
  template: ''
})
export class PlayerRankingStubComponent implements OnChanges {
  @Input() league;
  constructor() { }
  ngOnChanges() { }
}

@Component({
  selector: 'app-player-forecast',
  template: ''
})
export class PlayerForecastStubComponent implements OnInit {
  @Input() leagueId;
  @Input() playerId;
  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'app-player-opponents',
  template: ''
})
export class PlayerOpponentsStubComponent implements OnInit {
  @Input() leagueId;
  @Input() playerId;
  ngOnInit() {}
}

@Component({
  selector: 'app-player-cell',
  template: '{{player?.username}}'
})
export class PlayerCellStubComponent implements OnInit {
  @Input() match: Match;
  @Input() player: Player;
  @Input() currentPlayerId: string;
  constructor() {};
  ngOnInit() {}
}

@Component({
  selector: 'app-player-user-info',
  template: ''
})
export class PlayerUserInfoStubComponent implements OnInit {
  @Input() player: Player;
  constructor() {};
  ngOnInit() {}
}
