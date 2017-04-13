import { Match } from './../matches/shared/match.model';
import { Queue } from './../queue/shared/queue.model';
import { Injectable, Component, OnInit, Input } from '@angular/core';

export const QUEUE: Queue = {
    id: '123',
    name: 'testQueue',
    description: 'Test Queue',
    matches: [
        new Match()
    ]
}

@Injectable()
export class QueueServiceStub {

    getDailyQueue(): Promise<Queue> {
        return Promise.resolve(QUEUE);
    }

    getQueueByLeagueId(id: string): Promise<Queue> {
        return Promise.resolve(QUEUE);
    }
}

@Component({
  selector: 'app-queue-list',
  template: ''
})
export class QueueListComponent implements OnInit {
    @Input("leagueId") leagueId: string;
    
    ngOnInit(): void { }
}