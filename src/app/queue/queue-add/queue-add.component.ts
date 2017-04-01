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

  constructor(
    private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers(this.leagueId);
  }

  onSubmit() {
  }

  private getPlayers(leagueId: string) {
    this.playerService.getPlayers(leagueId).then(
      players => this.players = players
    );
  }

  playerFormatter(player: Player): string {
    return player.username? player.username : '';
  }
}
