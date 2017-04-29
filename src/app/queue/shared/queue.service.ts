import { Player } from './../../players/shared/player.model';
import { Match } from './../../matches/shared/match.model';
import { Http, Headers } from '@angular/http';
import { Queue } from './queue.model';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable()
export class QueueService {

    private url = environment.serverUrl;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    queue: Queue;

    constructor(private http: Http) {
    }

    getQueueByLeagueId(id: string): Promise<Queue> {
        let url = `${this.url}/leagues/${id}/queue`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Queue)
            .catch(this.handleError);
    }

    addMatchToQueue(match: Match, queueId: string): Promise<Queue> {
        let url = `${this.url}/queue/${queueId}/addMatch`;
        return this.http.put(url, JSON.stringify(match), { headers: this.headers })
            .toPromise()
            .then(queue => queue.json() as Queue)
            .catch(this.handleError);
    }

    removeMatchFromQueue(match: Match, queueId: string): Promise<Queue> {
        let url = `${this.url}/queue/${queueId}/removeMatch/${match.id}`;
        return this.http.put(url, null, { headers: this.headers })
            .toPromise()
            .then(queue => queue.json() as Queue)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    private generatePlayer(id: string): Player {
        let player = new Player();
        player.id = id;
        player.username = 'Player' + id;
        player.rating = 0;

        return player;
    }
}