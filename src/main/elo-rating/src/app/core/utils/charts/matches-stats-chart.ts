import { Match } from './../../../matches/shared/match.model';
import { ChartBuilder } from 'app/core/utils/charts/chart-builder';

export class MatchesStatsChart extends ChartBuilder {
  constructor(private matches: Match[], private playerId: string) {
    super();
  }

  public buildTitle() {
    this.chart.title = 'Matches statistics'
  }
  public buildSeries() {
    let matchesCount = this.matches.length
    let win = 0;
    let loss = 0;
    this.matches.forEach(match => {
      if (this.isWinner(match)) 
        win += 1;
      else
        loss +=1;
    });
    this.chart.series.push({name: 'Won matches', data: {value: win, max: matchesCount}});
    this.chart.series.push({name: 'Lost matches', data: {value: loss, max: matchesCount}});
    this.chart.series.push({name: 'Percentage of winnings', data: {value: this.getPercentage(win), max: 100}})
  }

  private isWinner(match: Match): boolean {
    return match.scores[this.playerId] == 2;
  }

  private getPercentage(wins: number): number {
    return Math.round(wins * 100 / this.matches.length);
  }
}