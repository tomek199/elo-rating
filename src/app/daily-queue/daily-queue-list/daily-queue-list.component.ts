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

  dailyQueue: Array<QueueElement>;

  queueElement: QueueElement;

  constructor(private dailyQueueService: DailyQueueService) {
    this.queueElement = new QueueElement();
  }

  ngOnInit() {
    this.dailyQueue = this.dailyQueueService.getQueue();
  }

  deleteElement(index: number) {
    this.dailyQueue.splice(index, 1);
  }
}
