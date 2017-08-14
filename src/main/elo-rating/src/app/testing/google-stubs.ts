import { User } from './../users/shared/user.model';
import { AfterViewInit, Component, Input, Injectable } from '@angular/core';

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
    return null;
  }

  getIdToken(): string {
    return null;
  }

  getCurrentLeague(): string {
    return '123';
  }

  setCurrentLeague(leagueId: string) {
  }
}