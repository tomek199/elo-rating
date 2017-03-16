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

  constructor() {}

  ngOnInit() {
  }

  onSubmit() {
    //this.dailyQueue.push(this.queueElement);
    this.match = new Match();
  }
}
