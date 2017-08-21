import { User } from './../users/shared/user.model';
import { AfterViewInit, Component, Input, Injectable, Output, EventEmitter } from '@angular/core';

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

  getUser(): User {
    let user = new User();
    user.id = '123';
    return user;
  }

  getIdToken(): string {
    return null;
  }

  getCurrentLeagueId(): string {
    return '123';
  }

  setCurrentLeague(leagueId: string) {
  }

  isAuthorized(): boolean {
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