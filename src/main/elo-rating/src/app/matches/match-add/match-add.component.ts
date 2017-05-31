import { Queue } from './../../queue/shared/queue.model';
import { QueueService } from './../../queue/shared/queue.service';
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
  queue: Queue;
  players: Player[];
  match: Match;
  score: string;

  completed: boolean = true;
  time = { hour: '', minute: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private matchService: MatchService,
    private queueService: QueueService
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
          this.matchService.getMatchById(this.matchId).then(match => this.match = this.matchService.serialize(match));
          this.queueService.getQueueByLeagueId(this.leagueId).then(queue => this.queue = queue);
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
    let scores = this.score.split('-');
    this.match.scores = {};
    this.match.scores[this.match.playerOne.id] = +scores[0];
    this.match.scores[this.match.playerTwo.id] = +scores[1];
  }

  formValid(): boolean {
    return this.match.isValid();
  }

  create() {
    if (this.matchId != null) {
      this.queueService.removeMatchFromQueue(this.match, this.queue.id);
      this.addMatch();
    } else {
      this.addMatch();
    }

  }

  private addMatch() {
    this.matchService.add(this.leagueId, this.match)
      .then(match => {
        this.goToList();
      });
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
  }
}
