import { League } from './../../leagues/shared/league.model';
import { Player } from './../../players/shared/player.model';
export class Match {
  id: string;
  playerOne: Player;
  playerTwo: Player;
  scores: { [id: string]: number; }
  ratings: { [id: string]: number; }
  date: Date;
  completed: boolean;
  ratingDelta: number;
  league: League;

  constructor() {
    this.playerOne = new Player();
    this.playerTwo = new Player();
    this.scores = {};
    this.ratings = {};
    this.completed = false;
  }

  isValid(): boolean {
    return this.isPlayersValid() && this.isScoreValid();
  }

  isPlayersValid(): boolean {
    return this.playerOne.id
      && this.playerTwo.id
      && this.playerOne.id != this.playerTwo.id;
  }

  isScoreValid(): boolean {
    return this.scores[this.playerOne.id] != undefined
      && this.scores[this.playerTwo.id] != undefined;
  }
}
