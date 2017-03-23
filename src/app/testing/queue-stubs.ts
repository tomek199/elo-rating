import { Queue } from './../queue/shared/queue.model';
import { Injectable } from '@angular/core';

export const QUEUE: Queue = {
    id: '0',
    name: 'testQueue',
    description: 'Test Queue',
    matches: [
        { 
            id: "match1",

            playerOne: {
                id: "0",
                username: "Test Player 1",
                rating: 0
            }, 
            playerTwo: {
                id: "1",
                username: "Test Player 2",
                rating: 0
            }, 
            playerOneScore: 100,
            playerTwoScore: 200,
            date: new Date
        }
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