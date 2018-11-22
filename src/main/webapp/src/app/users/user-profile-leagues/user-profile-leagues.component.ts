import {User} from './../shared/user.model';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-profile-leagues',
  templateUrl: './user-profile-leagues.component.html',
  styleUrls: ['./user-profile-leagues.component.css']
})
export class UserProfileLeaguesComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() { }

  hasLeagues(): boolean {
    return this.user.leagues && this.user.leagues.length > 0;
  }
}
