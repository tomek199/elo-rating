import { PlayerService } from './../shared/player.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from './../shared/player.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.map(p => p['tournament_id'])
      .forEach(tournament_id => {
        this.playerService.getPlayers(tournament_id)
          .then(players => this.players = players);
      });
  }
}
