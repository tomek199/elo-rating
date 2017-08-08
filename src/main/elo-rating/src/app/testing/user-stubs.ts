import { League } from './../leagues/shared/league.model';
import { User } from './../users/shared/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceStub {

  assignLeague(userId: string, leagueId: string) {
    let user = new User();
    user.id = userId;
    user.name = "Username";
    let league = new League('987', 'Assigned league');
    user.leagues = [];
    user.leagues.push(league);
    return Promise.resolve(user);
  }
}