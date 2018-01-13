import { User } from './../shared/user.model';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/users/shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private googleAuthService: GoogleAuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    let userId = this.googleAuthService.getCurrentUser().id;
    this.userService.get(userId)
      .then(response => this.user = response);
  }
}
