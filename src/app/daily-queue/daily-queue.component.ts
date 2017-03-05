import { DailyQueueService } from './daily-queue.service';
import { QueueElement } from './queueElement.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-queue',
  templateUrl: './daily-queue.component.html',
  styleUrls: ['./daily-queue.component.css'],
  providers: [DailyQueueService]
})
export class DailyQueueComponent implements OnInit {

  dailyQueue: Array<QueueElement>;

  constructor(private dailyQueueService: DailyQueueService) {
  }

  ngOnInit() {
    this.dailyQueue = this.dailyQueueService.getQueue();
  }

  deleteElement(index: number) {
    this.dailyQueue.splice(index, 1);
  }

}
