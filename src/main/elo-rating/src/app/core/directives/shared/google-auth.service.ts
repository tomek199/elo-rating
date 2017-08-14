import { User } from './../../../users/shared/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class GoogleAuthService {
  public readonly USER = 'user';
  public readonly TOKEN = 'token';
  public readonly LEAGUE = 'league';

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

  getCurrentLeague(): string {
    return sessionStorage.getItem(this.LEAGUE);
  }

  setCurrentLeague(leagueId: string) {
    sessionStorage.setItem(this.LEAGUE, leagueId);
  }
}
