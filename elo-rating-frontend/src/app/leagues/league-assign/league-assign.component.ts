import {UserService} from './../../users/shared/user.service';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {League} from './../shared/league.model';
import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-league-assign',
  templateUrl: './league-assign.component.html',
  styleUrls: ['./league-assign.component.css']
})
export class LeagueAssignComponent implements OnChanges {
  @Input() league: League;
  showSuccessAlert: boolean = false;

  constructor(
    private googleAuthService: GoogleAuthService,
    private userService: UserService
  ) { }

  ngOnChanges() {
    
  }

  isAuthenticated() {
    return this.googleAuthService.isAuthenticated();
  }

  getUser() {
    return this.googleAuthService.getCurrentUser();
  }

  isAssigned() {
    if (this.league != undefined)
      return this.league.users && this.league.users.length > 0;
    return true;
  }

  assignLeague() {
    let userId = this.googleAuthService.getCurrentUser().id;
    let leagueId = this.league.id;
    this.userService.assignLeague(leagueId, userId)
      .then(user => {
        sessionStorage.setItem(this.googleAuthService.USER, JSON.stringify(user));
        this.showSuccessAlert = true;
      });
  }
}
