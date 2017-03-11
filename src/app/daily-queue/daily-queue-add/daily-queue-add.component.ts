import { DailyQueueService } from './../shared/daily-queue.service';
import { QueueElement } from './../shared/queueElement.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-queue-add',
  templateUrl: './daily-queue-add.component.html',
  styleUrls: ['./daily-queue-add.component.css'],
  providers: [ DailyQueueService ]
})
export class DailyQueueAddComponent implements OnInit {

  queueElement: QueueElement;

  constructor(private dailyQueueService: DailyQueueService) {}

  ngOnInit() {
  }

  onSubmit() {
    //this.dailyQueue.push(this.queueElement);
    this.queueElement = new QueueElement();
  }
}
