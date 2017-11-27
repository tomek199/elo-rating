import { Player } from './../players/shared/player.model';
import { League } from './../leagues/shared/league.model';
import { User } from './../users/shared/user.model';
import { Injectable, Component } from '@angular/core';

@Injectable()
export class UserServiceStub {

  assignLeague(leagueId: string, userId: string) {
    let user = this.getUserWithLeague(userId);
    return Promise.resolve(user);
  }

  inviteUser(leagueId: string, currentUserId: string, userToInvite: User): Promise<User> {
    let user = new User();
    let league = new League();
    user.leagues = [];
    user.leagues.push(league);
    return Promise.resolve(user);
  }  

  verifySecurityToken(token: string): Promise<boolean> {
    return Promise.resolve(true);
  }

  completeInvitation(googleIdToken: string, securityToken: string): Promise<User> {
    let user = this.getUserWithLeague('123');
    return Promise.resolve(user);
  }

  createPlayer(leagueId: string, userId: string): Promise<User> {
    let user = this.getUserWithLeague('123');
    user.players = [];
    let player = new Player();
    player.id = '987';
    user.players.push(player);
    return Promise.resolve(user);
  }

  private getUserWithLeague(userId: string): User {
    let user = new User();
    user.id = userId;
    user.name = "Username";
    let league = new League('987', 'Assigned league');
    user.leagues = [];
    user.leagues.push(league);
    return user;
  }
}

@Component({
  selector: 'app-user-create-player',
  template: ''
})
export class UserCreatePlayerStubComponent { }