export class Chart {
  type: string;
  data: Array<any>;
  datasets: Array<any>;
  labels: Array<any>;
  options: any;

  constructor() {
    this.data = [];
    this.datasets = [];
    this.labels = [];
    this.options = {
      responsive: true
    }
  }
}
