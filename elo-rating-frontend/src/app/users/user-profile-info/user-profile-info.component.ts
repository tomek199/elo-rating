import {UserService} from 'app/users/shared/user.service';
import {CommonService} from './../../core/shared/common.service';
import {User} from './../shared/user.model';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.css']
})
export class UserProfileInfoComponent implements OnInit {

  public isCollapsed = true;

  @Input() user: User;
  @Output() userChange: EventEmitter<User> = new EventEmitter();

  timezones: string[];
  timezone: string;

  constructor(private commonService: CommonService, private userService: UserService) { }

  ngOnInit() {
    this.commonService.getTimezones().then(timezones => this.timezones = timezones);
    this.timezone = this.user.timezone;
  }

  isUserTimezone(timezone: string): boolean {
    return timezone.indexOf(this.user.timezone) > -1 ? true : false;
  }

  updateUserTimezone() {
    this.userService.updateTimezone(this.user.id, this.timezone).then(user => {
      this.user = user
      this.userChange.emit(this.user);
    });
  }
}
