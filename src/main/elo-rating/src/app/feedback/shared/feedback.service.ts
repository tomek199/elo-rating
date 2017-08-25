import { Http, Headers } from '@angular/http';
import { Feedback } from './feedback.model';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FeedbackService {
  private url = environment.serverUrl;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  
  constructor(private http: Http) { }

  send(feedback: Feedback): Promise<boolean> {
    let url = `${this.url}/feedback/send`;
    return this.http.post(url, JSON.stringify(feedback), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
