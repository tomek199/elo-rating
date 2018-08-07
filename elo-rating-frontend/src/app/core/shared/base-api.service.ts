import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {environment} from './../../../environments/environment';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

export abstract class BaseApiService {

  protected url = environment.serverUrl;
  protected headers = new Headers({'Content-Type': 'application/json'});

  constructor(protected googleAuthService: GoogleAuthService) { }

  protected generateHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Authorization', this.googleAuthService.getIdToken());
    return headers;
  }

  protected handleError(error: any): Promise<any> {
    return Promise.resolve(null);
  }
}
