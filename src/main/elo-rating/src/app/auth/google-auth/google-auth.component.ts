import { UserService } from './../../users/shared/user.service';
import { User } from './../../users/shared/user.model';
import { GoogleAuthService } from './../shared/google-auth.service';
import { environment } from './../../../environments/environment';
import { Component, NgZone, AfterViewInit, Input, OnInit } from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {

  @Input() leagueId;
  private token: string;
  public user: User;
  
  constructor(
    private userService: UserService,
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() { 
    this.token = this.googleAuthService.getIdToken();
    this.user = this.googleAuthService.getCurrentUser();
  }

  onSignIn = (googleUser: any) => {
    this.saveIdToken(googleUser.getAuthResponse());
    this.saveUser(googleUser.getBasicProfile()); 
  }

  private saveIdToken(authResponse) {
    this.token = authResponse.id_token;
    sessionStorage.setItem(this.googleAuthService.TOKEN, this.token);
  }

  private saveUser(googleProfile: any) {
    this.userService.signIn(this.token)
      .then(user => {
        this.user = user;
        sessionStorage.setItem(this.googleAuthService.USER, JSON.stringify(this.user));
      });
  }

  signOut() {
    let auth = gapi.auth2.getAuthInstance();
    auth.signOut();
    this.clearTokenAndProfile();
  }

  private clearTokenAndProfile() {
    this.token = undefined;
    this.user = undefined;
    sessionStorage.removeItem(this.googleAuthService.TOKEN);
    sessionStorage.removeItem(this.googleAuthService.USER);
  }

  isAuthorized(): boolean {
    return this.googleAuthService.isAuthorized();
  }

  getCurrentPlayerId(): string | null {
    return this.googleAuthService.getCurrentPlayerId();
  }
}
