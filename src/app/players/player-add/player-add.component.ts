import { Player } from './../shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from './../shared/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {
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
    this.route.params.map(p => p['league_id'])
      .forEach(id => {
        this.leagueId = id;
      });
  }

  addPlayer() {
    this.playerService.addPlayer(this.leagueId, this.player)
      .then(player => {
        this.goToList();
      });
  }

  goToList() {
    this.router.navigate(['/leagues', this.leagueId, 'players']);  
  }
}
