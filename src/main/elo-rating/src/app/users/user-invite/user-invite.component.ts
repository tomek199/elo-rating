import { League } from 'app/leagues/shared/league.model';
import { GoogleAuthService } from './../../core/directives/shared/google-auth.service';
import { User } from './../shared/user.model';
import { UserService } from './../shared/user.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {
  email: string;
  showSuccessAlert: boolean;
  private leagueId: string;
  private currentUser: User;

  constructor(
    private userService: UserService,
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() {
    this.showSuccessAlert = false;
    this.leagueId = this.googleAuthService.getCurrentLeague();
    this.currentUser = this.googleAuthService.getUser();
  }

  searchUsers = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term.length < 2 ? [] : this.userService.findByName(term));
  
  selectUser(event) {
    this.email = event.item.email;
    event.preventDefault();
  }

  showForm() {
    return this.showSuccessAlert != undefined && this.showSuccessAlert != true
  }

  sendInvitation() {
    this.showSuccessAlert = undefined;
    let userToInvite = this.prepareUser();
    this.userService.inviteUser(this.currentUser.id, userToInvite)
      .then(user => {
        this.showSuccessAlert = true;
      });
  }

  private prepareUser() {
    let user = new User();
    user.email = this.email;
    let league = new League(this.leagueId);
    user.leagues = [];
    user.leagues.push(league);
    return user;
  }

  clear() {
    this.email = undefined;
    this.showSuccessAlert = false;
  }
}
