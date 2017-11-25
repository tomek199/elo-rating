import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { environment } from './../../../environments/environment.prod';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export abstract class BaseApiService {

  protected url = environment.serverUrl;
  protected headers = new Headers({'Content-Type': 'application/json'});

  constructor(protected googleAuthService: GoogleAuthService) { 
    let token = this.googleAuthService.getIdToken();
    this.headers.append('X-Authorization', token);
  }

  protected handleError(error: any): Promise<any> {
    return Promise.resolve(null);
  }
}
