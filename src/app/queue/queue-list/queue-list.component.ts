import { ActivatedRoute } from '@angular/router';
import { QueueService } from './../shared/queue.service';
import { Queue } from './../shared/queue.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css']
})
export class QueueListComponent implements OnInit {

  @Input("queue") queue: Queue = new Queue();
  @Input("leagueId") leagueId: string;

  constructor() {
  }

  ngOnInit() {
  }

  deleteElement(index: number) {
    this.queue.matches.splice(index, 1);
  }
}
