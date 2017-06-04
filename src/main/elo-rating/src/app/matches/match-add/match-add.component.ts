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

  time = { hour: '', minute: '' };

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
    this.setTimepickerTime();
  }

  setMatch() {
    this.route.params.map(param => param['match_id'])
      .forEach(match_id => {
        if (match_id != null) {
          this.matchId = match_id;
          this.matchService.getMatchById(this.matchId)
            .then(match => {
              this.match = this.matchService.serialize(match)
              this.match.completed = true;
            });
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

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.toLowerCase().includes(term.toLowerCase())));

  playerFormatter(player: Player): string {
    return player.username ? player.username : '';
  }

  hasMinTwoPlayers(): boolean {
    if (this.players) {
      return this.players.length > 1;
    } else {
      return false;
    }
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
    if (this.match.completed) {
      return this.match.isValid() && this.match.isPlayersValid();
    } else {
      return this.match.isPlayersValid() && this.isTimeValid();
    }
  }

  private isTimeValid(): boolean {
    let now = new Date();
    let timepickerDate = new Date();
    timepickerDate.setHours(Number(this.time.hour));
    timepickerDate.setMinutes(Number(this.time.minute));
    return now < timepickerDate ? true : false;
  }

  create() {
    this.addMatch();
  }

  private addMatch() {
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

  setTimepickerTime() {
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

    this.time.hour = hour.toString();
    this.time.minute = minutes.toString();
    if (this.time.hour == '0') {
      this.time.hour = '00';
    }
    if (this.time.minute == '0') {
      this.time.minute = '00';
    }

    this.setMatchDate();
  }

  private setMatchDate() {
    if (this.match.completed) {
      this.match.date = new Date();
    } else {
      let date = new Date();
      date.setHours(Number(this.time.hour));
      date.setMinutes(Number(this.time.minute));
      this.match.date = date;
    }
  }
}
