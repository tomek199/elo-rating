import { MatchService } from './../../matches/shared/match.service';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from './../../players/shared/player.service';
import { Match } from './../../matches/shared/match.model';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css'],
  providers: [PlayerService, MatchService]
})
export class QueueListComponent implements OnInit, OnChanges {

  @Input('leagueId') leagueId: string;

  players = new Array<Player>();
  match: Match;
  scheduledMatches = new Array<Match>();
  time = { hour: '', minute: '' };

  constructor(private playerService: PlayerService, private router: Router, private matchService: MatchService) {
    this.match = new Match();
    this.setTimepickerTime();
  }

  ngOnInit() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    this.leagueId = changes['leagueId'].currentValue;
    if (this.leagueId != null) {
      this.getScheduledMatches(this.leagueId);
      this.getPlayers(this.leagueId);
    }
  }

  deleteElement(index: number) {
    let _match = this.scheduledMatches[index];
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'add', _match.id]);
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.toLowerCase().includes(term.toLowerCase())));

  formValid(): boolean {
    return this.match.isPlayersValid();
  }

  isScheduledMatchesEmpty(): boolean {
    return this.scheduledMatches.length == 0 ? true : false;
  }

  private isTimepickerTimeValid(): boolean {
    let date = new Date();
    return Number(this.time.hour) >= date.getHours() && Number(this.time.minute) > date.getMinutes();
  }

  private getScheduledMatches(leagueId: string) {
    this.matchService.getScheduledMatches(leagueId).then(
      matches => this.scheduledMatches = matches
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
    this.getScheduledMatches(this.leagueId);
    this.getPlayers(this.leagueId);
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
