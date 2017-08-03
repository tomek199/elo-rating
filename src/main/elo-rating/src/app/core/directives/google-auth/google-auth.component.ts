import { User } from './../../../users/shared/user.model';
import { GoogleAuthService } from './../shared/google-auth.service';
import { environment } from './../../../../environments/environment';
import { Component, NgZone, AfterViewInit } from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements AfterViewInit {

  private readonly signInButtonId = 'googleSignInButton';
  private token: string;
  public user: User;
  
  constructor(
    private zone: NgZone
  ) { }

  ngAfterViewInit() {
    this.initAuthModule();
    this.initButton();
  }

  private initAuthModule() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: environment.googleClientId
      });
    });
  }

  private initButton() {
    gapi.signin2.render(this.signInButtonId,
      {
        onSuccess: this.onSignIn,
        scope: 'profile email'
      });
  }

  onSignIn = (googleUser: any) => {
    this.zone.run(() => {
      this.saveIdToken(googleUser.getAuthResponse());
      this.saveUser(googleUser.getBasicProfile()); 
    });
  }

  private saveIdToken(authResponse) {
    this.token = authResponse.id_token;
    sessionStorage.setItem('token', this.token);
  }

  private saveUser(googleProfile: any) {
    this.user = new User();
    this.user.id = googleProfile.getId();
    this.user.name = googleProfile.getName();
    this.user.givenName = googleProfile.getGivenName();
    this.user.familyName = googleProfile.getFamilyName();
    this.user.email = googleProfile.getEmail();
    this.user.pictureUrl = googleProfile.getImageUrl();
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  signOut() {
    let auth = gapi.auth2.getAuthInstance();
    auth.signOut();
    this.clearTokenAndProfile();
  }

  private clearTokenAndProfile() {
    this.token = undefined;
    this.user = undefined;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
