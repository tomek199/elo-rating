import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {ConfirmModalComponent} from './../../core/directives/confirm-modal/confirm-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PlayerService} from './../shared/player.service';
import {ActivatedRoute} from '@angular/router';
import {Player} from './../shared/player.model';
import {Component, OnInit} from '@angular/core';

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
    private modalService: NgbModal,
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayers();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
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

  displayAlert(): boolean {
    if (this.activePlayers && this.inactivePlayers) 
      return this.activePlayers.length == 0 && this.inactivePlayers.length == 0;
    return false
  }

  openDeleteModal(index: number): void {
    let player = this.inactivePlayers[index];
    let modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.title = 'Delete!';
    modal.componentInstance.text = `Are you sure you want to delete player ${player.username}?`;
    modal.result.then((result) => {
      if (result) {
        this.delete(index);
      }
    })
  }

  delete(index: number): void {
    let id = this.inactivePlayers[index].id;
    this.playerService.delete(this.leagueId, id)
      .then(result => {
        if (result) {
          this.getPlayers();
        }
      });    
  }

  openDisableModal(index: number): void {
    let player = this.activePlayers[index];
    let modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.title = 'Disable!';
    modal.componentInstance.text = `Are you sure you want to disable player ${player.username}`;
    modal.result.then((result) => {
      if (result) {
        this.disable(index);
      }
    })
  }

  disable(index: number): void {
    let player = this.activePlayers[index];
    player.active = false;
    this.playerService.update(this.leagueId, player)
      .then(result => {
        if (result) {
          this.getPlayers();
        }
      })
  }

  isAuthorized(): boolean {
    return (!this.googleAuthService.isLeagueAssigned() || this.googleAuthService.isAuthorized());
  }

  hasActivePlayers(): boolean {
    return this.activePlayers != null && this.activePlayers.length > 0;
  }

  hasUser(player: Player): boolean {
    return player.user != undefined;
  }
}
