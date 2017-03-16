import { Queue } from './../daily-queue/shared/queue.model';
import { Injectable } from '@angular/core';

export const QUEUE: Queue = {
    id: '0',
    name: 'testQueue',
    description: 'Test Queue',
    matches: [
        { player1: 'player1', player2: 'player2' }
    ]
}

@Injectable()
export class DailyQueueServiceStub {

    getDailyQueue(): Promise<Queue> {
        return Promise.resolve(QUEUE);
    }
}