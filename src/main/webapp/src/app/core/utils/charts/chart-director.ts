import {Chart} from './chart.model';
import {ChartBuilder} from 'app/core/utils/charts/chart-builder';

export class ChartDirector {
  private builder: ChartBuilder;

  public setBuilder(builder: ChartBuilder) {
    this.builder = builder;
  }

  public build(): Chart {
    this.builder.buildTitle();
    this.builder.buildSeries();
    return this.builder.getChart();
  }
}
