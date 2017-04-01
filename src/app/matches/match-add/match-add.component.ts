import { MatchService } from './../shared/match.service';
import { Observable } from 'rxjs/Observable';
import { Match } from './../shared/match.model';
import { PlayerService } from './../../players/shared/player.service';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css']
})
export class MatchAddComponent implements OnInit {
  leagueId: string;
  players: Player[];
  match: Match;
  score: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
    this.match = new Match();
   }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayers();        
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getPlayers() {
    this.playerService.getPlayers(this.leagueId)
      .then(players => this.players = players.filter(p => p.active == true));
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
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

  setMatchScore() {
    let scores = this.score.split('-');
    this.match.playerOneScore = +scores[0];
    this.match.playerTwoScore = +scores[1];
  }

  formValid(): boolean {
    return this.match.isValid(true);
  }

  create() {
    this.matchService.add(this.leagueId, this.match)
      .then(match => {
        this.goToList();
      });
  }

  goToList() {
    this.router.navigate(['/leagues', this.leagueId, 'matches']);  
  }
}
