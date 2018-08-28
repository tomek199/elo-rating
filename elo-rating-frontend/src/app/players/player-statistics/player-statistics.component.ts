import {MatchesStatsChart} from './../../core/utils/charts/matches-stats-chart';
import {PlayerService} from './../shared/player.service';
import {RatingHistoryChart} from './../../core/utils/charts/rating-history-chart';
import {ChartDirector} from './../../core/utils/charts/chart-director';
import {Chart} from './../../core/utils/charts/chart.model';
import {Player} from './../shared/player.model';
import {ActivatedRoute} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import {PlayerStatsService} from "../shared/player-stats.service";
import {MinMaxRatingChart} from "../../core/utils/charts/min-max-rating-chart";

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
  minMaxRatingStats: Chart;
  player: Player;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private playerStatsService: PlayerStatsService
  ) {
    this.chartDirector = new ChartDirector();
  }

  ngOnInit() {
    this.getLeagueId();
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

  getPlayer() {
    this.playerService.getPlayer(this.playerId)
      .then(player => this.player = player);
  }

  generateStatistics() {
    this.buildRatingHistory();
    this.buildMatchesStats();
  }

  buildRatingHistory() {
    this.ratingHistory = undefined;
    this.playerStatsService.getPlayerRatingHistory(this.playerId, this.getDateFrom())
      .then(history => {
        let chartBuilder = new RatingHistoryChart(history);
        this.chartDirector.setBuilder(chartBuilder);
        this.ratingHistory = this.chartDirector.build();
      });
  }

  buildMatchesStats() {
    this.playerStatsService.getPlayerMatchesStats(this.playerId)
      .then(statistics => {
        let matchesStats = new MatchesStatsChart(statistics);
        this.chartDirector.setBuilder(matchesStats);
        this.matchesStats = this.chartDirector.build();

        let minMaxStats = new MinMaxRatingChart(statistics, this.player);
        this.chartDirector.setBuilder(minMaxStats);
        this.minMaxRatingStats = this.chartDirector.build();
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
    if (this.player == undefined)
      return false;
    return this.player.statistics.won + this.player.statistics.draw + this.player.statistics.lost > 0;
  }

  displayAlert(): boolean {
    if (this.player == undefined)
      return false;
    return this.player.statistics.won + this.player.statistics.draw + this.player.statistics.lost == 0;
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
}
