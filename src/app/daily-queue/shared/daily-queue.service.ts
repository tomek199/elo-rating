import { Http, Headers } from '@angular/http';
import { Queue } from './queue.model';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { QueueElement } from './queueElement.model';

@Injectable()
export class DailyQueueService {

    private url = environment.serverUrl + "/queue";
    private headers = new Headers({'Content-Type': 'application/json'});

    dailyQueue: Queue;

    constructor(private http: Http) {
        //this.dailyQueue = this.mockQueue();
    }

    getDailyQueue(): Promise<Queue> {
        let url = this.url + '/name/dailyQueue';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Queue)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    mockQueue(): Queue {
        let queue: Queue = new Queue();
        queue.id = "0";
        queue.name = "mockQueue";
        queue.description = "Mocked Queue";

        let matches: QueueElement[] = new Array<QueueElement>();
        let i:number = 0;

        for (i = 0; i < 4; i++) {
            let player1 = "PlayerA" + i;
            let player2 = "PlayerB" + i;
            let queueElement = new QueueElement(player1, player2);
            matches.push(queueElement);
        }

        queue.matches = matches;

        return queue;
    }
}