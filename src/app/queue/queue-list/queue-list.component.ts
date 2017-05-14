import { Observable } from 'rxjs/Observable';
import { PlayerService } from './../../players/shared/player.service';
import { Match } from './../../matches/shared/match.model';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QueueService } from './../shared/queue.service';
import { Queue } from './../shared/queue.model';
import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css'],
  providers: [PlayerService, QueueService]
})
export class QueueListComponent implements OnInit, OnChanges {

  @Input('leagueId') leagueId: string;

  queue: Queue;
  players = new Array<Player>();
  match: Match;
  time = { hour: '', minute: '' };

  constructor(private playerService: PlayerService, private queueService: QueueService, private router: Router) {
    this.queue = new Queue();
    this.match = new Match();
    this.setTimepickerTime();
  }

  ngOnInit() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    this.leagueId = changes['leagueId'].currentValue;
    if (this.leagueId != null) {
      this.getQueue(this.leagueId);
      this.getPlayers(this.leagueId);
    }
  }

  onSubmit() {
    this.setMatchDate();
    this.queueService.addMatchToQueue(this.match, this.queue.id).then(
      queue => this.queue = queue
    );
    this.match = new Match();
  }

  deleteElement(index: number) {
    let _match = this.queue.matches[index];
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'add', _match.id]);
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.includes(term)));

  formValid(): boolean {
    return this.match.isPlayersValid();
  }

  private isTimepickerTimeValid(): boolean {
    let date = new Date();
    return Number(this.time.hour) >= date.getHours() && Number(this.time.minute) > date.getMinutes();
  }

  private getQueue(leagueId: string) {
    this.queueService.getQueueByLeagueId(leagueId).then(
      queue => this.queue = queue
    );
  }

  private getPlayers(leagueId: string) {
    this.playerService.getPlayers(leagueId).then(
      players => this.players = players.filter(p => p.active === true)
    );
  }

  playerFormatter(player: Player): string {
    return player.username ? player.username : '';
  }

  refreshQueue() {
    this.getQueue(this.leagueId);
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

  private setMatchDate() {
    let date = new Date();
    date.setHours(Number(this.time.hour));
    date.setMinutes(Number(this.time.minute));
    this.match.date = date;
  }
}
