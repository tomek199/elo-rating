import { Chart } from './chart.model';
export abstract class ChartBuilder {
  protected chart: Chart;

  constructor() {
    this.chart = new Chart();
  }

  public getChart(): Chart {
    return this.chart;
  }

  public abstract buildType();
  public abstract buildData();
  public abstract buildDataSet();
  public abstract buildLabels();
}