import { Injectable } from '@angular/core';
import { QueueElement } from './queueElement.model';

@Injectable()
export class DailyQueueService {

    dailyQueue: QueueElement[];

    constructor() {
        this.dailyQueue = this.mockQueue();
    }

    getQueue(): QueueElement[] {
        return this.dailyQueue;
    }

    mockQueue(): QueueElement[] {
        var mockQueue: QueueElement[] = new Array<QueueElement>();
        var i:number = 0;

        for (i = 0; i < 4; i++) {
            var player1 = "PlayerA" + i;
            var player2 = "PlayerB" + i;
            var queueElement = new QueueElement(player1, player2);
            mockQueue.push(queueElement);
        }

        return mockQueue;
    }
}