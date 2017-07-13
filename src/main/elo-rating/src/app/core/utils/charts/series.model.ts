export class Series {
  name: string;
  type: string;
  data: any;
  showValue: string;

  constructor(name: string, type: string, data: any, showValue?: string) {
    this.name = name;
    this.type = type;
    this.data = data;
    this.showValue = showValue;
  }
}