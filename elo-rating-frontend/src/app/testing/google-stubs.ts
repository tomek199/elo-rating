import {USERS} from './data/users';
import {User} from './../users/shared/user.model';
import {AfterViewInit, Component, EventEmitter, Injectable, Input, Output} from '@angular/core';

@Component({
  selector: 'app-google-auth',
  template: ''
})
export class GoogleAuthComponentStub implements AfterViewInit {
  @Input() leagueId;
  ngAfterViewInit(): void { }
}

@Injectable()
export class GoogleAuthServiceStub {

  isAuthenticated(): boolean {
    return true;
  }

  getCurrentUser(): User {
    return USERS[0];
  }

  getIdToken(): string {
    return null;
  }

  setCurrentLeague(leagueId: string) {
  }

  isAuthorized(): boolean {
    return true;
  }

  getCurrentPlayerId(): string | null {
    return '123';
  }

  isLeagueAssigned(): boolean {
    return true;
  }
}

@Component({
  selector: 'app-google-button',
  template: ''
})
export class GoogleButtonComponentStub implements AfterViewInit {
  @Input() buttonId: string;
  @Output() onSignIn = new EventEmitter<any>();

  constructor() { }
  ngAfterViewInit() { }
}

export class GoogleUserStub {
  public getAuthResponse() {
    return {id_token: '123'};
  }
}
