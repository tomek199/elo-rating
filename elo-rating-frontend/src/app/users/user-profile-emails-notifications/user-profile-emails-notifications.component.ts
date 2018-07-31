import {UserService} from './../shared/user.service';
import {Component, Input, OnInit} from '@angular/core';
import {User} from 'app/users/shared/user.model';

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

  updateUserEmailNotifications() {
    this.userService.updateEmailNotifications(this.user.id, this.user.emailsNotifications).then(user => this.user = user);
  }
}
