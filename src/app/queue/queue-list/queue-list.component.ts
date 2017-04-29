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

  constructor(private playerService: PlayerService, private queueService: QueueService, private router: Router) {
    this.queue = new Queue();
    this.match = new Match();
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
    this.queue.matches.push(this.match);
    this.queueService.addMatchToQueue(this.match, this.queue.id).then(
      queue => this.queue = queue
    );
    this.match = new Match();
  }

  deleteElement(index: number) {
    this.match = this.queue.matches[index];
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'add', this.match.id]);
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.includes(term)));

  formValid(): boolean {
    return this.match.isPlayersValid();
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
}
