import { Observable } from 'rxjs/Observable';
import { Queue } from './../shared/queue.model';
import { PlayerService } from './../../players/shared/player.service';
import { QueueListComponent } from './../queue-list/queue-list.component';
import { Player } from './../../players/shared/player.model';
import { Match } from './../../matches/shared/match.model';
import { QueueService } from './../shared/queue.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue-add',
  templateUrl: './queue-add.component.html',
  styleUrls: ['./queue-add.component.css'],
  providers: [QueueService]
})
export class QueueAddComponent implements OnInit {

  @Input("queue") queue: Queue;
  @Input("leagueId") leagueId: string;

  players = new Array<Player>();

  match: Match;

  constructor(private playerService: PlayerService) {
    this.match = new Match();
  }

  ngOnInit() {
    this.getPlayers(this.leagueId);
  }

  onSubmit() {
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.includes(term)));

  formValid(): boolean {
    return this.match.isValid(false);
  }

  private getPlayers(leagueId: string) {
    this.playerService.getPlayers(leagueId).then(
      players => this.players = players.filter(p => p.active == true)
    );
  }

  playerFormatter(player: Player): string {
    return player.username? player.username : '';
  }
}
