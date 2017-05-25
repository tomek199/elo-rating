import { ConfirmModalComponent } from './../../core/utils/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from './../shared/player.model';
import { MatchService } from './../../matches/shared/match.service';
import { Match } from './../../matches/shared/match.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.css']
})
export class PlayerMatchesComponent implements OnInit, OnChanges {
  @Input() leagueId: string;
  @Input() playerId: string;
  playedMatches: Match[];
  scheduledMatches: Match[];

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute, 
    private router: Router, 
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayerId();
    this.getMatches();
  }

  getLeagueId() {
    if (!this.leagueId) {
      this.route.params.map(param => param['league_id'])
        .forEach(league_id => this.leagueId = league_id);
    }
  }

  getPlayerId() {
    if (!this.playerId) {
      this.route.params.map(param => param['player_id'])
        .forEach(player_id => this.playerId = player_id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playedMatches = [];
    this.getMatches();
  }

  getMatches() {
    this.matchService.getPlayerMatches(this.playerId)
      .then(matches => {
        this.playedMatches = matches.filter(match => this.isComplete(match.scores));
        this.scheduledMatches = matches.filter(match => !this.isComplete(match.scores));
      });
  }

  isComplete(scores: {[id: string] : number;}): boolean {
    return Object.keys(scores).length > 0;
  }

  hasMatches(): boolean {
    return this.hasPlayedMatches();
  }

  hasPlayedMatches(): boolean {
    return (this.playedMatches != undefined && this.playedMatches.length > 0);    
  }

  hasScheduledMatches(): boolean {
    return (this.scheduledMatches != undefined && this.scheduledMatches.length > 0);
  }

  getScore(index: number, player: Player): number {
    let key = player ? player.id : '';
    return this.playedMatches[index].scores[key];
  }

  isCurrent(player: Player): boolean {
    return player && player.id == this.playerId;
  }

  isWinner(index: number, player: Player): boolean {
    if (player && player.id == this.playerId) {
      return this.playedMatches[index].scores[player.id] == 2;
    }
    return false;
  }

  isLooser(index: number, player: Player): boolean {
    if (player && player.id == this.playerId) {
      return this.playedMatches[index].scores[player.id] != 2;
    }
    return false;
  }

  openDeleteModal(matchId: string): void {
    let modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.text = `Are you sure you want to delete match?`;
    modal.result.then((result) => {
      if (result) {
        this.delete(matchId);
      }
    })
  }

  delete(matchId: string) {
    this.matchService.delete(matchId)
      .then(result => {
        if (result) {
          this.getMatches();
        }
      });
  }

  goToMatch(matchId: string) {
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'add', matchId]);
  }
}
