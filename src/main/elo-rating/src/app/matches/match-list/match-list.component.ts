import { Page } from './../../core/pagination/page.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './../../core/utils/confirm-modal/confirm-modal.component';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from './../shared/match.service';
import { Match } from './../shared/match.model';
import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  leagueId: string;
  pageNumber: number;
  pageSize: number;
  page: Page<Match>;
  scheduledMatches: Match[];

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.pageNumber = 1;
    this.pageSize = 5;
    this.getMatches();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getMatches() {
    this.getCompletedMatches();
    this.getScheduledMatches();
  }

  getPage(page: number) {
    this.getCompletedMatches();
  }

  setPageSize() {
    this.pageNumber = 1;
    this.getCompletedMatches();
  }

  private getCompletedMatches() {
    this.matchService.getCompletedMatches(this.leagueId, this.pageNumber, this.pageSize)
      .then(page => this.page = page);
  }

  private getScheduledMatches() {
    this.matchService.getScheduledMatches(this.leagueId)
      .then(matches => this.scheduledMatches = matches);
  }

  isComplete(scores: {[id: string] : number;}): boolean {
    return Object.keys(scores).length > 0;
  }

  hasMatches(): boolean {
    return (this.hasCompletedMatches() || this.hasScheduledMatches());
  }

  hasCompletedMatches(): boolean {
    return (this.page != undefined && this.page.numberOfElements != 0);
  }

  hasScheduledMatches(): boolean {
    return (this.scheduledMatches != undefined && this.scheduledMatches.length > 0);    
  }

  getScore(index: number, player: Player): number {
    let key = player ? player.id : '';
    return this.page.content[index].scores[key];
  }

  getRating(index: number, player: Player): number {
    let key = player ? player.id : '';
    return index < this.page.content.length ? this.page.content[index].ratings[key] : 1000;
  }

  isWinner(index: number, player: Player) {
    if (player) {
      return this.page.content[index].scores[player.id] == 2;
    } else {
      return this.checkIfDeletedIsWinner(index);
    }
  }

  private checkIfDeletedIsWinner(index: number) {
    let match = this.page.content[index];
    let player = [match.playerOne, match.playerTwo].find(player => player != undefined);
    if (player != undefined) {
      return match.scores[player.id] != 2;
    } else {
      return false;
    }
  }

  hasBothPlayersDeleted(index: number) {
    let match = this.page.content[index];
    return !match.playerOne && !match.playerTwo;
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

  openRevertModal(matchId: string): void {
    let modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.title = 'Revert';
    modal.componentInstance.text = `Are you sure you want to revert this match? 
                                    Players ratings will be restoret to previous state
                                    and match will be deleted.`;
    modal.result.then((result) => {
      if (result) {
        this.revertMatch(matchId);
      }
    });
  }

  revertMatch(matchId: string) {
    this.matchService.revertMatch(matchId)
      .then(result => {
        this.getCompletedMatches();
      })
  }

  showRevertButton(index: number): boolean {
    return index == 0 && this.pageNumber == 1;
  }

  goToMatch(matchId: string) {
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'add', matchId]);
  }
}
