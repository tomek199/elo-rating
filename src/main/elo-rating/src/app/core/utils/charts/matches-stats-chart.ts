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
    let setsWon = 0;
    let setsLost = 0;
    this.matches.forEach(match => {
      if (this.isWinner(match)) 
        win += 1;
      else
        loss +=1;

      Object.keys(match.scores).forEach(key => {
        let value = match.scores[key];
        if (key == this.playerId)
          setsWon += value;
        else
          setsLost += value;
      });
    });
    this.chart.series.push({name: 'Won matches', type: 'success', data: {value: win, max: matchesCount}});
    this.chart.series.push({name: 'Lost matches', type: 'danger', data: {value: loss, max: matchesCount}});
    this.chart.series.push({name: 'Percentage of winnings', type: 'info', data: {value: this.getPercentage(win), max: 100}, showValue: 'true'});
    this.chart.series.push({name: 'Sets won', type: 'success', data: {value: setsWon, max: setsWon + setsLost}});
    this.chart.series.push({name: 'Sets lost', type: 'danger', data: {value: setsLost, max: setsWon + setsLost}});
  }

  private isWinner(match: Match): boolean {
    return match.scores[this.playerId] == 2;
  }

  private getPercentage(wins: number): number {
    return Math.round(wins * 100 / this.matches.length);
  }
}