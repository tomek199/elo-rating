import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Http} from '@angular/http';
import {Feedback} from './feedback.model';
import {Injectable} from '@angular/core';
import {BaseApiService} from "../../core/shared/base-api.service";


@Injectable()
export class FeedbackService extends BaseApiService {
  
  constructor(private http: Http, protected googleAuthService: GoogleAuthService) {
    super(googleAuthService);
  }

  send(feedback: Feedback): Promise<boolean> {
    let url = `${this.url}/feedback/send`;
    return this.http.post(url, JSON.stringify(feedback), { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }
}
