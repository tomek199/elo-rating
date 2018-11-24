import {Series} from './series.model';
import {Match} from './../../../matches/shared/match.model';
import {ChartBuilder} from 'app/core/utils/charts/chart-builder';
import {PlayerMatchesStats} from "../../../players/shared/player-matches-stats.model";
import {Player} from "../../../players/shared/player.model";

export class MinMaxRatingChart extends ChartBuilder {

  constructor(private statistics: PlayerMatchesStats, private player: Player) {
    super();
  }

  public buildTitle() {
    this.chart.title = 'Min max rating statistics'
  }

  public buildSeries() {
    let maxData = {
      rating: this.statistics.maxRating,
      delta: this.getMaxRatingDelta(),
      date: new Date(this.statistics.maxRatingDate)
    };
    let maxSeries = new Series('Max rating', null, maxData);
    let minData = {
      rating: this.statistics.minRating,
      delta: this.getMinRatingDelta(),
      date: new Date(this.statistics.minRatingDate)
    };
    let minSeries = new Series('Min rating', null, minData);
    this.chart.series.push(maxSeries, minSeries);
  }

  private getMaxRatingDelta(): number {
    return this.statistics.maxRating - this.player.rating
  }

  private getMinRatingDelta(): number {
    return this.statistics.minRating - this.player.rating
  }
}
