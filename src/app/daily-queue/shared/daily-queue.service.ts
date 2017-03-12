import { Queue } from './queue.model';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { QueueElement } from './queueElement.model';

@Injectable()
export class DailyQueueService {

    private url = environment.serverUrl + "/queue";

    dailyQueue: Queue;

    constructor() {
        this.dailyQueue = this.mockQueue();
    }

    getDailyQueue(): Queue {
        return this.dailyQueue;
    }

    mockQueue(): Queue {
        var queue: Queue = new Queue();
        queue.id = "0";
        queue.name = "mockQueue";
        queue.description = "Mocked Queue";

        var matches: QueueElement[] = new Array<QueueElement>();
        var i:number = 0;

        for (i = 0; i < 4; i++) {
            var player1 = "PlayerA" + i;
            var player2 = "PlayerB" + i;
            var queueElement = new QueueElement(player1, player2);
            matches.push(queueElement);
        }

        queue.matches = matches;

        return queue;
    }
}