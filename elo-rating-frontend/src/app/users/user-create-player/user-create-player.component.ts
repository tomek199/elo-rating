import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from './../shared/user.service';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-create-player',
  templateUrl: './user-create-player.component.html',
  styleUrls: ['./user-create-player.component.css']
})
export class UserCreatePlayerComponent implements OnInit {
  private leagueId: string;

  constructor(
    private googleAuthService: GoogleAuthService,
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLeagueId();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  show(): boolean {
    return this.googleAuthService.isAuthorized() && this.hasNotPlayer();
  }

  private hasNotPlayer(): boolean {
    return this.googleAuthService.getCurrentPlayerId() == null;
  }

  create() {
    let currentUser = this.googleAuthService.getCurrentUser();
    this.userService.createPlayer(this.leagueId, currentUser.id)
      .then(user => {
        sessionStorage.setItem(this.googleAuthService.USER, JSON.stringify(user));
        this.goToPlayer();
      });
  }

  private goToPlayer() {
    let playerId = this.googleAuthService.getCurrentPlayerId();
    this.router.navigate(['/leagues', this.leagueId, 'players', playerId]);  
  }
}
