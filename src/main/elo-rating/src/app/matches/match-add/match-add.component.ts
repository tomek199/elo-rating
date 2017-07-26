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
  matchId: string;
  players: Player[];
  match: Match;
  score: string;
  mode: string;

  time = { hour: 0, minute: 0};

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
    this.setMatch();
    this.getPlayers();
  }

  setMatch() {
    this.route.params.map(param => param['match_id'])
      .forEach(match_id => {
        if (match_id != null) {
          this.matchId = match_id;
          this.getMatch();
        } else {
          this.getPossibleMatchTime();
        }
      });
  }

  getMatch() {
    this.matchService.getMatchById(this.matchId)
      .then(match => {
        this.match = this.matchService.serialize(match)
        this.getMode();
      });
  }

  getMode() {
    this.route.params.map(param => param['mode'])
      .forEach(mode => {
        this.mode = mode;
        if (mode == 'complete') {
          this.match.completed = true
        } else if (mode == 'edit') {
          this.match.completed = false
          this.time.hour = this.match.date.getHours();
          this.time.minute = this.match.date.getMinutes();
        }
      });
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getPlayers() {
    this.playerService.getPlayers(this.leagueId)
      .then(players => this.players = players.filter(p => p.active === true));
  }

  getComponentName(): string {
    if (this.mode != undefined) 
      return this.mode.charAt(0).toUpperCase() + this.mode.slice(1) + ' match';
    else 
      return 'Add match'
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.toLowerCase().includes(term.toLowerCase())));

  playerFormatter(player: Player): string {
    return player.username ? player.username + " (" + player.rating + ")": '';
  }

  hasMinTwoPlayers(): boolean {
    if (this.players) {
      return this.players.length > 1;
    } else {
      return false;
    }
  }

  displayAlert(): boolean {
    if (this.players)
      return this.players.length < 2;
    return false;
  }

  isCompleteMode(): boolean {
    return this.mode == 'complete';
  }

  setMatchScore() {
    if (this.score) {
      let scores = this.score.split('-');
      this.match.scores = {};
      this.match.scores[this.match.playerOne.id] = +scores[0];
      this.match.scores[this.match.playerTwo.id] = +scores[1];
    }
  }

  formValid(): boolean {
    if (this.match.completed) 
      return this.match.isValid();
    else 
      return this.match.isPlayersValid() && this.isTimeValid();
  }

  isTimeValid(): boolean {
    if (!this.time) return false;
    let now = new Date();
    let timepickerDate = new Date();
    timepickerDate.setHours(this.time.hour);
    timepickerDate.setMinutes(this.time.minute);
    return now < timepickerDate ? true : false;
  }

  save() {
    this.setMatchDate();
    this.matchService.add(this.leagueId, this.match)
      .then(match => {
        this.goToList();
      });
  }

  checkboxCheckAction() {
    this.match.completed = !this.match.completed;
    if (!this.match.completed) {
      this.score = "";
      this.match.scores = {};
    }
  }

  goToList() {
    this.router.navigate(['/leagues', this.leagueId, 'matches']);
  }

  getPossibleMatchTime() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let addition = 10 - (minutes % 10);
    minutes = minutes + addition + 10;
    if (minutes >= 60) {
      hour = hour + 1;
      if (hour >= 24) {
        hour = 0;
      }
      minutes = minutes - 60;
    }

    this.time.hour = hour;
    this.time.minute = minutes;
  }

  private setMatchDate() {
    if (!this.match.completed) {
      let date = new Date();
      date.setHours(this.time.hour);
      date.setMinutes(this.time.minute);
      this.match.date = date;
    }
  }
}
