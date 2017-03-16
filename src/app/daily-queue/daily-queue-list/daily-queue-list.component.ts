import { QueueService } from './../shared/queue.service';
import { Queue } from './../shared/queue.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-queue-list',
  templateUrl: './daily-queue-list.component.html',
  styleUrls: ['./daily-queue-list.component.css'],
  providers: [QueueService]
})
export class DailyQueueListComponent implements OnInit {

  dailyQueue: Queue;

  constructor(private queueService: QueueService) {}

  ngOnInit() {
    this.dailyQueue = new Queue();
    //this.dailyQueueService.getDailyQueue()
     // .then(dailyQueue => this.dailyQueue = dailyQueue);
    this.dailyQueue = this.queueService.mockQueue();
  }

  deleteElement(index: number) {
    this.dailyQueue.matches.splice(index, 1);
  }
}
