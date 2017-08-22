import { Router } from '@angular/router';
import { User } from './../shared/user.model';
import { UserService } from './../shared/user.service';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create-player',
  templateUrl: './user-create-player.component.html',
  styleUrls: ['./user-create-player.component.css']
})
export class UserCreatePlayerComponent implements OnInit {
  private leagueId: string;
  private user: User;

  constructor(
    private googleAuthService: GoogleAuthService,
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.leagueId = this.googleAuthService.getCurrentLeagueId();
    this.user = this.googleAuthService.getCurrentUser();
  }

  show(): boolean {
    return this.googleAuthService.isAuthorized() && this.hasNotPlayer();
  }

  private hasNotPlayer(): boolean {
    if (this.user) 
      return this.user.players == undefined;
    return false;
  }

  create() {
    this.userService.createPlayer(this.user.id, this.leagueId)
      .then(user => this.goToPlayer(''));
  }

  private goToPlayer(playerId: string) {
    this.router.navigate(['/leagues', this.leagueId, 'players', playerId]);  
  }
}
