import { User } from './../../../users/shared/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class GoogleAuthService {
  private readonly USER = 'user';
  private readonly TOKEN = 'token';

  constructor() { }

  isAuthenticated(): boolean {
    let user = sessionStorage.getItem(this.USER);
    let token = sessionStorage.getItem(this.TOKEN);
    return user !== null && token !== null;
  }

  getUser(): User {
    let user = sessionStorage.getItem(this.USER);
    return JSON.parse(user);
  }

  getIdToken(): string {
    return sessionStorage.getItem(this.TOKEN);
  }
}
