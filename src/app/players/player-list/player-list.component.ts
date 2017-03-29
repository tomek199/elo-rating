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
  leagueId: string;
  activePlayers: Player[];
  inactivePlayers: Player[];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.route.params.map(p => p['league_id'])
      .forEach(league_id => {
        this.leagueId = league_id;
        this.getPlayers();
      });
  }

  getPlayers() {
    this.playerService.getPlayers(this.leagueId)
      .then(players => {
        this.activePlayers = players.filter(p => p.active == true);
        this.inactivePlayers = players.filter(p => p.active == false);
      });
  }

  hasPlayers(): boolean {
    return (this.activePlayers != undefined && this.activePlayers.length > 0)
      || (this.inactivePlayers != undefined && this.inactivePlayers.length > 0);
  }

  openDeleteModal(index: number): void {
    let player = this.activePlayers[index];
    let modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.text = `Are you sure you want to delete player ${player.username}?`;
    modal.result.then((result) => {
      if (result) {
        this.delete(index);
      }
    })
  }

  delete(index: number): void {
    let id = this.activePlayers[index].id;
    this.playerService.delete(id)
      .then(result => {
        if (result) {
          this.getPlayers();
        }
      });    
  }
}
