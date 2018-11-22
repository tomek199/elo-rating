import {Chart} from './chart.model';

export abstract class ChartBuilder {
  protected chart: Chart;

  constructor() {
    this.chart = new Chart();
  }

  public getChart(): Chart {
    return this.chart;
  }

  public abstract buildTitle();
  public abstract buildSeries();
}
