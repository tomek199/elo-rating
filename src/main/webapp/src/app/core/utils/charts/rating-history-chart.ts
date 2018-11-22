import {Series} from './series.model';
import {Match} from './../../../matches/shared/match.model';
import {ChartBuilder} from "app/core/utils/charts/chart-builder";
import {RatingHistory} from "../../../players/shared/rating-history.model";

export class RatingHistoryChart extends ChartBuilder {
  constructor(private history: RatingHistory[]) {
    super();
  }

  public buildTitle() {
    this.chart.title = {text: 'Rating history'};
  }

  public buildSeries() {
    let data = [];
    this.history.forEach(match => {
      let matchDate = new Date(match.date);
      let date = `${matchDate.getDate()}-${matchDate.getMonth() + 1}-${matchDate.getFullYear()}`;
      let label = `${match.opponent} (${date})`;
      data.push([label, match.rating]);
    });
    this.chart.series.push(new Series('Rating', 'line', data));
  }
}
