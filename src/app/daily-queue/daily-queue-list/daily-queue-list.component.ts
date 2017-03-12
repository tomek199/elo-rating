import { Queue } from './../shared/queue.model';
import { DailyQueueService } from '../shared/daily-queue.service';
import { QueueElement } from '../shared/queueElement.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-queue-list',
  templateUrl: './daily-queue-list.component.html',
  styleUrls: ['./daily-queue-list.component.css'],
  providers: [DailyQueueService]
})
export class DailyQueueListComponent implements OnInit {

  dailyQueue: Queue;

  constructor(private dailyQueueService: DailyQueueService) {
    this.dailyQueue = new Queue();
  }

  ngOnInit() {
    this.dailyQueue = this.dailyQueueService.getDailyQueue();
  }

  deleteElement(index: number) {
    this.dailyQueue.matches.splice(index, 1);
  }
}
