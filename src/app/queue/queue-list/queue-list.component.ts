import { QueueService } from './../shared/queue.service';
import { Queue } from './../shared/queue.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css'],
  providers: [QueueService]
})
export class QueueListComponent implements OnInit {

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
