import { League } from './../../leagues/shared/league.model';
import { User } from './../../users/shared/user.model';
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

  getCurrentLeague(): League {
    let league = JSON.parse(sessionStorage.getItem(this.LEAGUE));
    return league;
  }

  getCurrentLeagueId(): string {
    return this.getCurrentLeague() ? this.getCurrentLeague().id : null;
  }

  setCurrentLeague(league: League) {
    if (league) 
      sessionStorage.setItem(this.LEAGUE, JSON.stringify(league));
    else 
      sessionStorage.removeItem(this.LEAGUE);
  }

  isAuthorized(): boolean {
    if (!this.isAuthenticated() || !this.getCurrentLeagueId())
      return false;
    if (this.getUser().leagues == null) 
      return false;
    let leagueMatched: boolean = false;
    this.getUser().leagues.forEach(league => {
      if (league.id == this.getCurrentLeagueId())
        leagueMatched = true;
    });
    return leagueMatched;
  }

  isLeagueAssigned(): boolean {
    if (!this.getCurrentLeague())
      return false;
    let leagueUsers = this.getCurrentLeague().users;
    if (leagueUsers && leagueUsers.length > 0)
      return true;
    return false;
  }
}
