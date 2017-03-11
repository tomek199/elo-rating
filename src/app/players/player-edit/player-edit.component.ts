import { Player } from './../shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from './../shared/player.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  tournamentId: string;
  player: Player;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.player = new Player();
   }

  ngOnInit() {
    this.route.params.map(p => p)
      .forEach(param => {
        this.tournamentId = param['tournament_id'];
        this.getPlayer(param['player_id']);
      });
  }

  getPlayer(playerId: string) {
    this.playerService.getPlayer(playerId)
      .then(player => this.player = player);
  }

  save() {
    this.playerService.update(this.player)
      .then(player => {
        this.player = player;
        this.goToList();
      })
  }

  goToList() {
    this.router.navigate(['/tournaments', this.tournamentId, 'players']);  
  }
}
