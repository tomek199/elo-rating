import {Series} from './series.model';

export class Chart {
  title: any;
  series: Array<Series>;

  constructor() {
    this.series = [];
  }
}
