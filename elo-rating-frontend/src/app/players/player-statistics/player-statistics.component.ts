import {MatchesStatsChart} from './../../core/utils/charts/matches-stats-chart';
import {MatchService} from './../../matches/shared/match.service';
import {PlayerService} from './../shared/player.service';
import {RatingHistoryChart} from './../../core/utils/charts/rating-history-chart';
import {ChartDirector} from './../../core/utils/charts/chart-director';
import {Chart} from './../../core/utils/charts/chart.model';
import {Player} from './../shared/player.model';
import {ActivatedRoute} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';

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
  player: Player;
  maxRating: number;
  minRating: number;
  maxMatchDate: Date;
  minMatchDate: Date;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private playerService: PlayerService
  ) {
    this.chartDirector = new ChartDirector();
   }

  ngOnInit() {
    this.getLeagueId();
    this.getPlayerId(); // TODO remove this
    this.getPlayer();
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

  getPlayer() {
    this.route.params.map(param => param['player_id'])
      .forEach(playerId => {
        this.playerService.getPlayer(playerId)
          .then(player => this.player = player);
      });
  }

  generateStatistics() {
    this.buildRatingHistory();
    this.buildMatchesStats();
  }

  buildRatingHistory() {
    this.ratingHistory = undefined;
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

        this.maxRating = chartBuilder.maxRating
        this.maxMatchDate = chartBuilder.maxMatchDate
        this.minRating = chartBuilder.minRating
        this.minMatchDate = chartBuilder.minMatchDate
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

  displayAlert(): boolean {
    if (this.matchesStats)
      return this.matchesStats.series.length == 0;
    return false;
  }

  hasRatingHistory(): boolean {
    if (this.ratingHistory != undefined) {
      let data = this.ratingHistory.series[0].data as Array<any>;
      return data.length > 0;
    }
    return false;
  }

  displayRatingHistoryAlert(): boolean {
    if (this.ratingHistory) {
      let data = this.ratingHistory.series[0].data as Array<any>;
      return data.length == 0;
    }
    return false;
  }

  getMaxRatingDelta(): number {
    return this.maxRating - this.player.rating
  }

  getMinRatingDelta(): number {
    return this.minRating - this.player.rating
  }
}
