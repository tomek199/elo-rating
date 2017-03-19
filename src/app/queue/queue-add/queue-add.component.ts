import { QueueListComponent } from './../queue-list/queue-list.component';
import { Player } from './../../players/shared/player.model';
import { Match } from './../../matches/shared/match.model';
import { QueueService } from './../shared/queue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue-add',
  templateUrl: './queue-add.component.html',
  styleUrls: ['./queue-add.component.css'],
  providers: [QueueService]
})
export class QueueAddComponent implements OnInit {

  match: Match;
  dailyQueueComponent: QueueListComponent;

  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    this.match = new Match();
    this.match.playerOne = new Player();
    this.match.playerOne.username = "aaa";
    this.match.playerTwo = new Player();
    this.match.playerTwo.username = "bbb";

    this.match.date = new Date();

    this.dailyQueueComponent.dailyQueue.matches.push(this.match);
  }
}
