import { Match } from './../../../matches/shared/match.model';
import { ChartBuilder } from "app/core/utils/charts/chart-builder";

export class RatingHistoryChart extends ChartBuilder {
  constructor(private matches: Match[], private playerId: string) {
    super();
  }

  public buildType() {
    this.chart.type = 'line';
  }
  public buildData() { }

  public buildDataSet() {
    let rates = [];
    this.matches.forEach(match => {
      rates.push(match.ratings[this.playerId]);
    });    
    this.chart.datasets.push({data: rates, label: 'Rating'});
  }

  public buildLabels() {
    this.matches.forEach(match => {
      this.chart.labels.push(this.getOpponent(match));
    })
  }

  private getOpponent(match: Match): string {
    if (match.playerOne == undefined || match.playerTwo == undefined) return 'deleted player';
    return (match.playerOne.id == this.playerId 
      ? match.playerTwo.username : match.playerOne.username);
  }
}