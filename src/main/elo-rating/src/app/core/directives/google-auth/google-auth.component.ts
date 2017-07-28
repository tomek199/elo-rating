import { Profile } from './../shared/profile.model';
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
  public profile: Profile;
  
  constructor(private zone: NgZone) { }

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
      this.token = googleUser.getAuthResponse().id_token;
      this.fillProfile(googleUser.getBasicProfile()); 
    });
  }

  private fillProfile(googleProfile: any) {
    this.profile = new Profile();
    this.profile.id = googleProfile.getId();
    this.profile.fullName = googleProfile.getName();
    this.profile.givenName = googleProfile.getGivenName();
    this.profile.familyName = googleProfile.getFamilyName();
    this.profile.email = googleProfile.getEmail();
    this.profile.imageUrl = googleProfile.getImageUrl();
  }

  signOut() {
    let auth = gapi.auth2.getAuthInstance();
    auth.signOut();
    this.token = undefined;
    this.profile = undefined;
  }
}
