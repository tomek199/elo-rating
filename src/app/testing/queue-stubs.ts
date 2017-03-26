import { Match } from './../matches/shared/match.model';
import { Queue } from './../queue/shared/queue.model';
import { Injectable } from '@angular/core';

export const QUEUE: Queue = {
    id: '0',
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