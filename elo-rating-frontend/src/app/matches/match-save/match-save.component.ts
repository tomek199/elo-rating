import { LeagueService } from './../../leagues/shared/league.service';
import { LeagueSettings } from './../../leagues/shared/league-settings';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { environment } from './../../../environments/environment';
import { MatchService } from './../shared/match.service';
import { Observable } from 'rxjs/Observable';
import { Match } from './../shared/match.model';
import { PlayerService } from './../../players/shared/player.service';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-match-save',
  templateUrl: './match-save.component.html',
  styleUrls: ['./match-save.component.css']
})
export class MatchSaveComponent implements OnInit {
  leagueId: string;
  scores: number[];
  allowDraws: boolean;
  players: Player[];
  match: Match;
  playerOneScore: number;
  playerTwoScore: number;
  mode: string;
  time;
  scheduledMatches: Map<string, Match>;
  timeMessage: string;
  matchDuration: number = environment.matchDuration;
  private savePromise: Promise<any>;
  @ViewChild('queuePopover') queuePopover: NgbPopover;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leagueService: LeagueService,
    private playerService: PlayerService,
    private matchService: MatchService,
    private googleAuthService: GoogleAuthService
  ) {
    this.match = new Match();
    this.scheduledMatches = new Map<string, Match>();
    this.savePromise = new Promise((resolve, reject) => {});
  }

  ngOnInit() {
    this.getLeagueId();
    this.setMatch();
    this.getPlayers();
  }

  private getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => {
        this.leagueId = league_id;
        this.getLeagueSettings();
      });
  }

  private getLeagueSettings() {
    this.leagueService.getLeagueSettings(this.leagueId)
      .then(settings => {
        this.scores = Array.from(Array(settings.maxScore + 1), (value, index) => index);
        this.allowDraws = settings.allowDraws;
      });
  }

  private setMatch() {
    this.route.params.map(param => param['match_id'])
      .forEach(match_id => {
        if (match_id != null) {
          this.getMatch(match_id);
        } else {
          this.getPossibleMatchTime();
          this.getScheduledMatches();
          this.setFirstPlayer();
        }
      });
  }

  private getMatch(matchId: string) {
    this.matchService.getMatchById(matchId)
      .then(match => {
        this.match = this.matchService.serialize(match)
        this.getMode();
      });
  }

  private getMode() {
    this.route.params.map(param => param['mode'])
      .forEach(mode => {
        this.mode = mode;
        if (mode == 'complete') {
          this.match.completed = true
        } else if (mode == 'edit') {
          this.match.completed = false
          this.getScheduledMatches();
          this.initTimeByMatch();
        }
      });
  }

  private getPlayers() {
    this.playerService.getPlayers(this.leagueId)
      .then(players => this.players = players.filter(p => p.active === true));
  }

  private getScheduledMatches() {
    this.matchService.getScheduledMatches(this.leagueId)
      .then(matches => {
        this.initScheduledMatches(matches);
      })
  }

  private initScheduledMatches(matches: Match[]) {
    this.scheduledMatches.clear();
    matches.forEach(match => {
      let date = new Date(match.date);
      let time: string = `${date.getHours()}:${date.getMinutes()}`;
      this.scheduledMatches.set(time, match);
    });
  }

  private initTimeByMatch() {
    this.time = {
      hour: this.match.date.getHours(),
      minute: this.match.date.getMinutes()
    };
  }

  private getPossibleMatchTime() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let addition = this.matchDuration - (minutes % this.matchDuration);
    minutes = minutes + addition + this.matchDuration;
    if (minutes >= 60) {
      hour = hour + 1;
      if (hour >= 24) {
        hour = 0;
      }
      minutes = minutes - 60;
    }
    this.time = {hour: hour, minute: minutes}
  }

  private setFirstPlayer() {
    let currentPlayerId = this.googleAuthService.getCurrentPlayerId();
    if (currentPlayerId) {
      this.playerService.getPlayer(currentPlayerId)
        .then(player => this.match.playerOne = player);
    }
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
    if (this.playerOneScore !== undefined && this.playerTwoScore !== undefined) {
      this.match.scores = {};
      this.match.scores[this.match.playerOne.id] = this.playerOneScore;
      this.match.scores[this.match.playerTwo.id] = this.playerTwoScore;
    }
  }

  formValid(): boolean {
    if (this.match.completed)
      return this.match.isValid(this.allowDraws);
    else 
      return this.isTimeValid() && this.match.isPlayersValid();
  }

  isTimeValid(): boolean {
    if (!this.time) return false;
    this.timeMessage = undefined;
    return this.isTimeAfterNow() && this.isTimeFree();
  }

  private isTimeAfterNow(): boolean {
    let now = new Date();
    let timepickerDate = new Date();
    timepickerDate.setHours(this.time.hour);
    timepickerDate.setMinutes(this.time.minute);
    if (now >= timepickerDate) {
      this.timeMessage = 'Time must be in the future';
      if (this.queuePopover) this.queuePopover.close();
      return false;
    }    
    return true;
  }

  private isTimeFree(): boolean {
    if (this.scheduledMatches) {
      let time = `${this.time.hour}:${this.time.minute}`;
      let match = this.scheduledMatches.get(time);
      if (match && match.id != this.match.id) {
        this.timeMessage = `Match "${match.playerOne.username} - ${match.playerTwo.username}" already scheduled at the same time`;
        if (this.queuePopover) this.queuePopover.open();
        return false;
      }
    }
    if (this.queuePopover) this.queuePopover.close();    
    return true;
  }

  save() {
    this.setMatchDate();
    this.matchService.save(this.leagueId, this.match)
      .then(match => {
        this.goToList();
      });
  }

  checkboxCheckAction() {
    this.match.completed = !this.match.completed;
    if (!this.match.completed) {
      this.playerOneScore = undefined;
      this.playerTwoScore = undefined;
      this.match.scores = {};
    }
  }

  goToList() {
    this.router.navigate(['/leagues', this.leagueId, 'matches']);
  }

  private setMatchDate() {
    if (!this.match.completed) {
      let date = new Date();
      date.setHours(this.time.hour);
      date.setMinutes(this.time.minute);
      this.match.date = date;
    }
  }

  getQueueMatches() {
    if (this.scheduledMatches) {
      let matches: Match[] = [];
      this.scheduledMatches.forEach(value => {
        matches.push(value);
      });
      return matches;
    }
    return null;
  }
}
