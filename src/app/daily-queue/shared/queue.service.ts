import { Player } from './../../players/shared/player.model';
import { Match } from './../../matches/shared/match.model';
import { Http, Headers } from '@angular/http';
import { Queue } from './queue.model';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable()
export class QueueService {

    private url = environment.serverUrl + "/queue";
    private headers = new Headers({'Content-Type': 'application/json'});

    dailyQueue: Queue;

    constructor(private http: Http) {
        this.dailyQueue = this.mockQueue();
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

        let matches: Match[] = new Array<Match>();
        let i:number = 0;

        for (i = 0; i < 4; i++) {
            let match = new Match();
            match.id = i.toString();
            match.playerOne = this.generatePlayer(i.toString());
            match.playerTwo = this.generatePlayer(i.toString() + "0");
            matches.push(match);
        }

        queue.matches = matches;

        return queue;
    }

    private generatePlayer(id: string): Player {
        let player = new Player();
        player.id = id;
        player.username = "Player" + id;
        player.points = 0;

        return player;
    }
}