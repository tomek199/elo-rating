import {ActivatedRoute} from '@angular/router';
import {Player} from './../../players/shared/player.model';
import {PlayerService} from './../../players/shared/player.service';
import {League} from 'app/leagues/shared/league.model';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {User} from './../shared/user.model';
import {UserService} from './../shared/user.service';
import {Observable} from 'rxjs/Observable';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent implements OnInit {
  email: string;
  player: Player;
  showSuccessAlert: boolean;
  private leagueId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private playerService: PlayerService,
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() {
    this.showSuccessAlert = false;
    this.getLeagueId();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  searchUsers = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term.length < 2 ? [] : this.userService.findByName(term));
  
  selectUser(event) {
    this.email = event.item.email;
    event.preventDefault();
  }

  searchPlayers = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term.length < 2 
        ? [] 
        : this.playerService.findByUsername(this.leagueId, term));

  playerFormatter(player: Player): string {
    return player.username ? player.username : '';
  }

  showForm() {
    return this.showSuccessAlert != undefined && this.showSuccessAlert != true
  }

  sendInvitation() {
    this.showSuccessAlert = undefined;
    let userToInvite = this.prepareUser();
    let currentUser = this.googleAuthService.getCurrentUser();
    this.userService.inviteUser(this.leagueId, currentUser.id, userToInvite)
      .then(user => {
        this.showSuccessAlert = true;
      });
  }

  private prepareUser() {
    let user = new User();
    user.email = this.email;
    this.connectLeague(user);
    this.connectPlayer(user);
    return user;
  }

  private connectLeague(user: User) {
    let league = new League(this.leagueId);
    user.leagues = [];
    user.leagues.push(league);
  }

  private connectPlayer(user: User) {
    if (this.player) {
      let player = new Player();
      player.id = this.player.id;
      user.players = [];
      user.players.push(player);
    }
  }

  clear() {
    this.email = undefined;
    this.player =  undefined;
    this.showSuccessAlert = false;
  }
}
