import { Series } from './series.model';
import { Match } from './../../../matches/shared/match.model';
import { ChartBuilder } from 'app/core/utils/charts/chart-builder';

export class MatchesStatsChart extends ChartBuilder {
  private win: number;
  private loss: number;
  private setsWon: number;
  private setsLost: number;
  public maxRating: number;
  public minRating: number;
  public maxMatchDate: Date;
  public minMatchDate: Date;

  constructor(private matches: Match[], private playerId: string) {
    super();
    this.win = 0;
    this.loss = 0;
    this.setsWon = 0;
    this.setsLost = 0;
    this.maxRating = 1000;
    this.minRating = 1000;
  }

  public buildTitle() {
    this.chart.title = 'Matches statistics'
  }

  public buildSeries() {
    if (this.matches.length > 0) {
      this.generateData();
      this.fillSeries();
    }
  }

  private generateData() {
    this.matches.forEach(match => {
      this.isWinner(match) ? this.win += 1 : this.loss +=1;
      Object.keys(match.scores).forEach(key => {
        let value = match.scores[key];
        key == this.playerId ? this.setsWon += value : this.setsLost += value;
        if (match.ratings[this.playerId] > this.maxRating) {
          this.maxRating = match.ratings[this.playerId];
          this.maxMatchDate = match.date;
        }
        if (match.ratings[this.playerId] < this.minRating) {
          this.minRating = match.ratings[this.playerId];
          this.minMatchDate = match.date;
        }
      });
    });
  }

  private fillSeries() {
    let matchesCount = this.matches.length;
    let win = new Series('Won matches', 'success', {value: this.win, max: matchesCount});
    let lost = new Series('Lost matches', 'danger', {value: this.loss, max: matchesCount})
    let percentage = new Series('Percentage of winnings', 'info', {value: this.getPercentage(this.win), max: 100}, 'true');
    let setsWon = new Series('Sets won', 'success', {value: this.setsWon, max: this.setsWon + this.setsLost})
    let setsLost = new Series('Sets lost', 'danger', {value: this.setsLost, max: this.setsWon + this.setsLost})

    this.chart.series.push(win, lost, percentage, setsWon, setsLost);
  }

  private isWinner(match: Match): boolean {
    return match.scores[this.playerId] == 2;
  }

  private getPercentage(wins: number): number {
    return Math.round(wins * 100 / this.matches.length);
  }
}
