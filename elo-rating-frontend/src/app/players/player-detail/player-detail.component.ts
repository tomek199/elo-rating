import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {ActivatedRoute} from '@angular/router';
import {PlayerService} from './../shared/player.service';
import {Player} from './../shared/player.model';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  leagueId: string;
  player: Player;
  
  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayer();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getPlayer() {
    this.route.params.map(param => param['player_id'])
      .forEach(playerId => {
        this.playerService.getPlayer(playerId)
          .then(player => this.player = player);     
      });
  }

  hasPlayer(): boolean {
    return this.player !== undefined;
  }

  isAuthorized(): boolean {
    return this.googleAuthService.isAuthorized();
  }
}
