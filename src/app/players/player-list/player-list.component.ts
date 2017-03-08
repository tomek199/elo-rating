import { ConfirmModalComponent } from './../../core/utils/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  tournamentId: string;
  players: Player[];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.map(p => p['tournament_id'])
      .forEach(tournament_id => {
        this.tournamentId = tournament_id;
        this.playerService.getPlayers(tournament_id)
          .then(players => this.players = players);
      });
  }

  hasPlayers(): boolean {
    return (this.players != undefined && this.players.length > 0);
  }

  openDeleteModal(index: number): void {
    let player = this.players[index];
    let modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.text = `Are you sure you want to delete player ${player.username}?`;
    modal.result.then((result) => {
      if (result) {
        this.delete(index);
      }
    })
  }

  delete(index: number): void {
    let id = this.players[index].id;
    this.playerService.delete(id)
      .then(result => {
        if (result) {
          this.players.splice(index, 1)
        }
      });    
  }
}
