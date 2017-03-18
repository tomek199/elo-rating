import { ActivatedRoute } from '@angular/router';
import { PlayerService } from './../shared/player.service';
import { Player } from './../shared/player.model';
import { Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute
  ) {
    this.player = new Player();
   }

  ngOnInit() {
    this.route.params.map(p => p)
      .forEach(param => {
        this.leagueId = param['league_id'];
        this.getPlayer(param['player_id']);    
      });
  }

  getPlayer(playerId: string) {
    this.playerService.getPlayer(playerId)
      .then(player => this.player = player);
  }
}
