import { MatchService } from './../../matches/shared/match.service';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from './../../players/shared/player.service';
import { Match } from './../../matches/shared/match.model';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.css'],
  providers: [PlayerService, MatchService]
})
export class QueueListComponent implements OnInit, OnChanges {

  @Input('leagueId') leagueId: string;

  scheduledMatches = new Array<Match>();

  constructor(private router: Router, private matchService: MatchService) {
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

  completeMatch(matchId: string) {
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'save', matchId, 'complete']);
  }
}
