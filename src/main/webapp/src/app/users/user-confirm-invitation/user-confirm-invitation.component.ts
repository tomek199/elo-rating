import {League} from './../../leagues/shared/league.model';
import {UserService} from './../shared/user.service';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-confirm-invitation',
  templateUrl: './user-confirm-invitation.component.html',
  styleUrls: ['./user-confirm-invitation.component.css']
})
export class UserConfirmInvitationComponent implements OnInit {
  
  showSuccessAlert: boolean;
  league: League;
  securityToken: string;

  constructor(
    private route: ActivatedRoute,
    private googleAuthService: GoogleAuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.showSuccessAlert = false;
    this.getSecurityToken();
  }

  getSecurityToken() {
    this.route.params.map(param => param['token'])
      .forEach(token => this.verifySecurityToken(token));
  }

  verifySecurityToken(securityToken: string) {
    this.userService.verifySecurityToken(securityToken)
      .then(token => {
        if (token)
          this.securityToken = securityToken;
        else 
          this.securityToken = null;
      });
  }

  showForm() {
    let successAlert = (this.showSuccessAlert != undefined && this.showSuccessAlert != true);
    let token = this.securityToken !== null;
    return successAlert && token;   
  }

  signIn(googleUser: any) {
    if (this.securityToken) {
      this.showSuccessAlert = undefined;
      let googleIdToken = this.saveIdToken(googleUser.getAuthResponse());
      this.completeInvitation(googleIdToken);
    }
  }

  private saveIdToken(authResponse) {
    let token = authResponse.id_token;
    sessionStorage.setItem(this.googleAuthService.TOKEN, token);
    return token;
  }

  private completeInvitation(googleIdToken: string) {
    this.userService.completeInvitation(googleIdToken, this.securityToken)
      .then(user => {
        if (user.id ) {
          this.showSuccessAlert = true;
          this.league = user.leagues[0];
          sessionStorage.setItem(this.googleAuthService.USER, JSON.stringify(user));
        }
        else {
          sessionStorage.removeItem(this.googleAuthService.TOKEN);
          this.showSuccessAlert = false;
          console.error("Something went wrong");
        }
      });
  }
}
