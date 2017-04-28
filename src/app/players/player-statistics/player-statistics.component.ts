import { MatchService } from './../../matches/shared/match.service';
import { RatingHistoryChart } from './../../core/utils/charts/rating-history-chart';
import { ChartBuilder } from 'app/core/utils/charts/chart-builder';
import { ChartDirector } from './../../core/utils/charts/chart-director';
import { Chart } from './../../core/utils/charts/chart.model';
import { Match } from './../../matches/shared/match.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.css']
})
export class PlayerStatisticsComponent implements OnInit, OnChanges {
  @Input() leagueId: string;
  @Input() playerId: string;
  private matches: Match[];
  private chartDirector: ChartDirector;
  ratingHistory: Chart;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {
    this.chartDirector = new ChartDirector();
   }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayerId();
    this.getMatches();
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  getMatches() {
    this.matchService.getPlayerMatches(this.playerId)
      .then(matches => {
        this.matches = matches.filter(match => this.isComplete(match.scores));
        this.buildRatingHistory();
      });
  }

  isComplete(scores: {[id: string] : number;}): boolean {
    return Object.keys(scores).length > 0;
  }

  buildRatingHistory() {
    let chartBuilder = new RatingHistoryChart(this.matches, this.playerId);
    this.chartDirector.setBuilder(chartBuilder);
    this.ratingHistory = this.chartDirector.build();
  }
}
