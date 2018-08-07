import {environment} from './../../../environments/environment';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Page} from './../../core/utils/pagination/page.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from './../../core/directives/confirm-modal/confirm-modal.component';
import {Player} from './../../players/shared/player.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchService} from './../shared/match.service';
import {Match} from './../shared/match.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit, OnDestroy {
  leagueId: string;
  pageNumber: number;
  pageSize: number;
  page: Page<Match>;
  scheduledMatches: Match[];
  private popoverText: string;
  private matchesSubscription: Subscription;
  private matchesListPromise: Promise<any>;
  private reschedulePromise: Promise<any>;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private googleAuthService: GoogleAuthService
  ) {
    this.popoverText = this.getPopoverText();
    this.matchesListPromise = new Promise((resolve, reject) => {});
    this.reschedulePromise = new Promise((resolve, reject) => {});
  }

  ngOnInit() {
    this.getLeagueId();
    this.pageNumber = 1;
    this.getMatches();
    this.subscribeMatches();
  }

  ngOnDestroy() {
    if (this.matchesSubscription)
      this.matchesSubscription.unsubscribe();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getMatches() {
    this.getCompletedMatches();
    this.getScheduledMatches();
  }

  private subscribeMatches() {
    if (environment.matchesRefreshing) {
      this.matchesSubscription = IntervalObservable.create(environment.matchesRefreshTime)
        .subscribe(() => this.getScheduledMatches());
    }
  }

  getPage(page: number) {
    this.getCompletedMatches();
  }

  setPageSize(pageSize: number) {
    this.pageNumber = 1;
    this.pageSize = pageSize;
    this.getCompletedMatches();
  }

  private getCompletedMatches() {
    this.matchesListPromise = this.matchService.getCompletedMatches(this.leagueId, this.pageNumber, this.pageSize)
      .then(page => this.page = page);
  }

  private getScheduledMatches() {
    this.matchService.getScheduledMatches(this.leagueId)
      .then(matches => this.scheduledMatches = matches);
  }

  displayAlert(): boolean {
    if (this.page && this.scheduledMatches)
      return this.page.content.length == 0 && this.scheduledMatches.length == 0;
    return false;
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

  isWinner(match: Match, player: Player) {
    if (player) {
      let opponentId = Object.keys(match.scores).find(key => key != player.id);      
      return match.scores[player.id] > match.scores[opponentId];
    } else {
      return this.checkIfDeletedIsWinner(match);
    }
  }

  private checkIfDeletedIsWinner(match: Match) {
    let opponent = [match.playerOne, match.playerTwo].find(player => player != undefined);
    if (opponent != undefined) {
      let playerId = Object.keys(match.scores).find(key => key != opponent.id);
      return match.scores[playerId] > match.scores[opponent.id];
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
    this.matchService.delete(this.leagueId, matchId)
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
    this.matchService.revertMatch(this.leagueId, matchId)
      .then(result => {
        this.getCompletedMatches();
      })
  }

  showRevertButton(index: number): boolean {
    return index == 0 && this.pageNumber == 1;
  }

  completeMatch(matchId: string) {
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'save', matchId, 'complete']);
  }

  editMatch(matchId: string) {
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'save', matchId, 'edit']);
  }

  isAuthorized(): boolean {
    return (!this.googleAuthService.isLeagueAssigned() || this.googleAuthService.isAuthorized());
  }

  isTimeAfter(timestamp: number): boolean {
    let now = new Date();
    let matchDate = new Date(timestamp);
    matchDate.setMinutes(matchDate.getMinutes() + environment.matchDuration);
    return now > matchDate;
  }

  showRescheduleBtn(): boolean {
    let timeAfter = false;
    for (let match of this.scheduledMatches) {
      let timestamp = new Date(match.date).getTime();
      timeAfter = this.isTimeAfter(timestamp);
      if (timeAfter) {
        break;
      }
    }
    return timeAfter && this.isAuthorized();
  }

  rescheduleMatches(): void {
    this.reschedulePromise = this.matchService.rescheduleMatches(this.leagueId, environment.matchDuration)
      .then(matches => this.scheduledMatches = matches);
  }

  hasRelatedMatchIncomplete(index: number): boolean {
    return this.matchService.hasRelatedMatchIncomplete(this.scheduledMatches, index);
  }

  private getPopoverText(): string {
    return 'Reschedule matches that are late for ' + environment.matchDuration + ' minutes';
  }
}
