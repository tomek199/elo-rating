import { Observable } from 'rxjs/Observable';
import { Match } from './../shared/match.model';
import { PlayerService } from './../../players/shared/player.service';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css']
})
export class MatchAddComponent implements OnInit {
  tournamentId: string;
  players: Player[];
  match: Match;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {
    this.match = new Match();
    this.match.playerOneScore = -1;
    this.match.playerTwoScore = -1;
   }

  ngOnInit() {
    this.route.params.map(p => p)
      .forEach(param => {
        this.tournamentId = param['tournament_id'];
        this.getPlayers();
      });
  }

  getPlayers() {
    this.playerService.getPlayers(this.tournamentId)
      .then(players => this.players = players);
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.includes(term)));
  
  playerFormatter(player: Player): string {
    return player.username? player.username : '';
  }

  hasMinTwoPlayers(): boolean {
    if (this.players) {
      return this.players.length > 1;
    } else {
      return false;
    }
  }

  formValid(): boolean {
    return this.match.playerOne.id
      && this.match.playerTwo.id
      && this.match.playerOne.id != this.match.playerTwo.id
      && this.match.playerOneScore != -1
      && this.match.playerTwoScore != -1
      && this.match.playerOneScore == 2 || this.match.playerTwoScore == 2
      && this.match.playerOneScore + this.match.playerTwoScore != 4;
  }

  create() {
    // TODO
  }
}
