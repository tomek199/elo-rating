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

  constructor(private dailyQueueService: DailyQueueService) {}

  ngOnInit() {
    this.dailyQueue = new Queue();
    this.dailyQueueService.getDailyQueue()
      .then(dailyQueue => this.dailyQueue = dailyQueue);
    //this.dailyQueue = this.dailyQueueService.mockQueue();
  }

  deleteElement(index: number) {
    this.dailyQueue.matches.splice(index, 1);
  }
}
