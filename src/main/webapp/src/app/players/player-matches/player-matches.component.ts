import {environment} from './../../../environments/environment';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {Subscription} from 'rxjs/Subscription';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Page} from './../../core/utils/pagination/page.model';
import {ConfirmModalComponent} from './../../core/directives/confirm-modal/confirm-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Player} from './../shared/player.model';
import {MatchService} from './../../matches/shared/match.service';
import {Match} from './../../matches/shared/match.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PlayerService} from '../shared/player.service';
import {of} from "rxjs";

@Component({
  selector: 'app-player-matches',
  templateUrl: './player-matches.component.html',
  styleUrls: ['./player-matches.component.css']
})
export class PlayerMatchesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() leagueId: string;
  @Input() playerId: string;
  pageNumber: number;
  pageSize: number;
  page: Page<Match>;
  opponent: Player;
  scheduledMatches: Match[];
  private matchesSubscription: Subscription;  

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private route: ActivatedRoute, 
    private router: Router, 
    private modalService: NgbModal,
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayerId();
    this.pageNumber = 1;
    this.getMatches();
    this.subscribeMatches();
  }

  ngOnDestroy() {
    if (this.matchesSubscription)
      this.matchesSubscription.unsubscribe();
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
    this.scheduledMatches = undefined;
    this.getScheduledMatches();
    this.clearFilter();
  }

  getMatches() {
    if (this.playerId != undefined) {
      this.getCompletedMatches();
      this.getScheduledMatches();
    }
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
    let opponentId = this.opponent ? this.opponent.id : undefined;
    this.matchService.getPlayerCompletedMatches(this.playerId, this.pageNumber, this.pageSize, opponentId)
      .then(page => this.page = page);
  }

  private getScheduledMatches() {
    this.matchService.getPlayerScheduledMatches(this.playerId)
      .then(matches => this.scheduledMatches = matches);
  }

  displayAlert(): boolean {
    if (this.page && this.scheduledMatches) 
      return this.page.content.length == 0 && this.scheduledMatches.length == 0;
    return false;
  }

  hasCompletedMatches(): boolean {
    return (this.page != undefined && this.page.numberOfElements > 0);    
  }

  hasScheduledMatches(): boolean {
    return (this.scheduledMatches != undefined && this.scheduledMatches.length > 0);
  }

  getScore(index: number, player: Player): number {
    let key = player ? player.id : '';
    return this.page.content[index].scores[key];
  }

  isCurrent(player: Player): boolean {
    return player && player.id == this.playerId;
  }

  isWinner(match: Match, player: Player) {
    if (player && player.id == this.playerId) {
      let opponentId = Object.keys(match.scores).find(key => key != player.id);      
      return match.scores[player.id] > match.scores[opponentId];
    } else {
      return false;
    }
  }

  isLooser(match: Match, player: Player) {
    if (player && player.id == this.playerId) {
      let opponentId = Object.keys(match.scores).find(key => key != player.id);      
      return match.scores[player.id] < match.scores[opponentId];
    } else {
      return false;
    }
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

  searchPlayers = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term.length < 2 
        ? of([])
        : this.playerService.findByUsername(this.leagueId, term));

  playerFormatter(player: Player): string {
    return player.username ? player.username : '';
  }

  filterByOpponent() {
    if (this.opponent && this.opponent.id !== this.playerId) {
      this.page = undefined;
      this.pageNumber = 1;
      this.getCompletedMatches();
    }
  }

  clearFilter() {
    this.opponent = undefined;
    this.page = undefined;
    this.pageNumber = 1;
    this.getCompletedMatches();
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
}
