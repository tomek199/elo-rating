import { DailyQueueListComponent } from './../daily-queue-list/daily-queue-list.component';
import { Player } from './../../players/shared/player.model';
import { Match } from './../../matches/shared/match.model';
import { DailyQueueService } from './../shared/daily-queue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-queue-add',
  templateUrl: './daily-queue-add.component.html',
  styleUrls: ['./daily-queue-add.component.css'],
  //providers: [ DailyQueueService ]
})
export class DailyQueueAddComponent implements OnInit {

  match: Match;
  dailyQueueComponent: DailyQueueListComponent;

  constructor() {}

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
