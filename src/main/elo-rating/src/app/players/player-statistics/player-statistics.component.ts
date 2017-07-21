import { MatchesStatsChart } from './../../core/utils/charts/matches-stats-chart';
import { ChartBuilder } from 'app/core/utils/charts/chart-builder';
import { MatchService } from './../../matches/shared/match.service';
import { RatingHistoryChart } from './../../core/utils/charts/rating-history-chart';
import { ChartDirector } from './../../core/utils/charts/chart-director';
import { Chart } from './../../core/utils/charts/chart.model';
import { Match } from './../../matches/shared/match.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.css']
})
export class PlayerStatisticsComponent implements OnInit {
  @Input() leagueId: string;
  @Input() playerId: string;
  private chartDirector: ChartDirector;
  period: number;
  ratingHistory: Chart;
  matchesStats: Chart;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {
    this.chartDirector = new ChartDirector();
   }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayerId();
    this.period = 7;
    this.generateStatistics();
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

  generateStatistics() {
    this.buildRatingHistory();
    this.buildMatchesStats();
  }

  buildRatingHistory() {
    this.matchService.getPlayerCompletedMatchesByDate(this.playerId, this.getDateFrom())
      .then(matches => {
        let chartBuilder = new RatingHistoryChart(matches, this.playerId);
        this.chartDirector.setBuilder(chartBuilder);
        this.ratingHistory = this.chartDirector.build();
      });
  }

  buildMatchesStats() {
    this.matchService.getPlayerCompletedMatchesByDate(this.playerId)
      .then(matches => {
        let chartBuilder = new MatchesStatsChart(matches, this.playerId);
        this.chartDirector.setBuilder(chartBuilder);
        this.matchesStats = this.chartDirector.build();
      });
  }

  private getDateFrom(): Date {
    if (this.period != undefined && this.period != -1) {
      let currentDate = new Date();
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - this.period);
    }
    return null;
  }

  hasMatches(): boolean {
    return this.matchesStats != undefined && this.matchesStats.series.length > 0;
  }

  hasRatingHistory(): boolean {
    if (this.ratingHistory != undefined) {
      let data = this.ratingHistory.series[0].data as Array<any>;
      return data.length > 0;
    }
    return false;
  }
}
