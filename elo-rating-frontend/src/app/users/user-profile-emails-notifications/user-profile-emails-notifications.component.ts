import { UserService } from './../shared/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/users/shared/user.model';

@Component({
  selector: 'app-user-profile-emails-notifications',
  templateUrl: './user-profile-emails-notifications.component.html',
  styleUrls: ['./user-profile-emails-notifications.component.css']
})
export class UserProfileEmailsNotificationsComponent implements OnInit {

  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  updateUser() {
    this.userService.update(this.user).then(user => this.user = user);
  }
}
