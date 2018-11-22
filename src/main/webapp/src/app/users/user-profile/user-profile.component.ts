import {User} from './../shared/user.model';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Component, OnInit} from '@angular/core';
import {UserService} from 'app/users/shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  component: string;

  constructor(private googleAuthService: GoogleAuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.component = 'info';
  }

  private getUser() {
    let userId = this.googleAuthService.getCurrentUser().id;
    this.userService.get(userId)
      .then(response => this.user = response);
  }

  hasUser(): boolean { 
    return this.user !== undefined;
  }

  changeComponent(component: string) {
    this.component = component;
  }

  isActive(component: string) {
    return this.component == component;
  }
}
