import {Player} from './../shared/player.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerService} from './../shared/player.service';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  leagueId: string;
  player: Player;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.player = new Player();
   }

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

  save() {
    this.playerService.update(this.leagueId, this.player)
      .then(player => {
        this.player = player;
        this.goToList();
      })
  }

  goToList() {
    this.router.navigate(['/leagues', this.leagueId, 'players']);  
  }
}
