import {UserService} from './../../users/shared/user.service';
import {User} from './../../users/shared/user.model';
import {GoogleAuthService} from './../shared/google-auth.service';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

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

  @ViewChild('signInPopover') signInPopover: NgbPopover;

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
        if (!this.validateSignedInUser(user)) {
          this.signOut();
          this.showLoginErrorPopover();
        } else {
          this.user = user;
          sessionStorage.setItem(this.googleAuthService.USER, JSON.stringify(this.user));
        }
      });
  }

  private validateSignedInUser(user: any): Boolean {
    if (user === null) {
      return false;
    }
    return true;
  }

  private showLoginErrorPopover(): void {
    this.signInPopover.open();
    this.hideSignInErrorPopup();
  }

  private hideSignInErrorPopup(): Promise<any> {
    return new Promise<number>(resolve => {
      setTimeout(() => {
        this.signInPopover.close();
      }, 3000);
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

  isAuthenticated(): boolean {
    return this.googleAuthService.isAuthenticated();
  }

  isAuthorized(): boolean {
    return this.googleAuthService.isAuthorized();
  }

  getCurrentPlayerId(): string | null {
    return this.googleAuthService.getCurrentPlayerId();
  }

  getProfileUrl(): string[] {
    if (this.leagueId)
      return ['leagues', this.leagueId, 'users', 'profile'];
    else
      return ['leagues', 'users', 'profile'];
  }
}
