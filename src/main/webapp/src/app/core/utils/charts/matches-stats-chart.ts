import {Series} from './series.model';
import {Match} from './../../../matches/shared/match.model';
import {ChartBuilder} from 'app/core/utils/charts/chart-builder';
import {PlayerMatchesStats} from "../../../players/shared/player-matches-stats.model";

export class MatchesStatsChart extends ChartBuilder {

  constructor(private statistics: PlayerMatchesStats) {
    super();
  }

  public buildTitle() {
    this.chart.title = 'Matches statistics'
  }

  public buildSeries() {
    let matchesCount = this.statistics.won + this.statistics.draw + this.statistics.lost;
    if (matchesCount > 0) {
      let setsCount = this.statistics.setsWon + this.statistics.setsLost;
      let win = new Series('Won matches', 'success', {value: this.statistics.won, max: matchesCount});
      let lost = new Series('Lost matches', 'danger', {value: this.statistics.lost, max: matchesCount})
      let percentage = new Series('Percentage of winnings', 'info', {
        value: this.getPercentage(this.statistics.won, matchesCount),
        max: 100
      }, 'true');
      let setsWon = new Series('Sets won', 'success', {value: this.statistics.setsWon, max: setsCount})
      let setsLost = new Series('Sets lost', 'danger', {value: this.statistics.setsLost, max: setsCount})

      this.chart.series.push(win, lost, percentage, setsWon, setsLost);
    }
  }

  private getPercentage(wins: number, matchesCount: number): number {
    return Math.round(wins * 100 / matchesCount);
  }
}
