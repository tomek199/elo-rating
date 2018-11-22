import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {MatchService} from './../../matches/shared/match.service';
import {PlayerService} from './../../players/shared/player.service';
import {Match} from './../../matches/shared/match.model';
import {Router} from '@angular/router';
import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css'],
  providers: [PlayerService, MatchService]
})
export class QueueListComponent implements OnInit, OnChanges {

  @Input('leagueId') leagueId: string;

  scheduledMatches = new Array<Match>();

  constructor(
    private router: Router, 
    private matchService: MatchService, 
    private googleAuthService: GoogleAuthService) {
  }

  ngOnInit() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.leagueId = changes['leagueId'].currentValue;
    if (this.leagueId != null) {
      this.getScheduledMatches(this.leagueId);
    }
  }

  isScheduledMatchesEmpty(): boolean {
    return this.scheduledMatches.length == 0 ? true : false;
  }

  private getScheduledMatches(leagueId: string) {
    this.matchService.getScheduledMatches(leagueId).then(
      matches => this.scheduledMatches = matches
    );
  }

  refreshQueue() {
    this.getScheduledMatches(this.leagueId);
  }

  completeMatch(index: number) {
    if (this.isAuthorized() && !this.hasRelatedMatchIncomplete(index))
      this.router.navigate(['/leagues', this.leagueId, 'matches', 'save', this.scheduledMatches[index].id, 'complete']);
  }

  isAuthorized(): boolean {
    return (!this.googleAuthService.isLeagueAssigned() || this.googleAuthService.isAuthorized());
  }

  hasRelatedMatchIncomplete(index: number): boolean {
    return this.matchService.hasRelatedMatchIncomplete(this.scheduledMatches, index);
  }
}
