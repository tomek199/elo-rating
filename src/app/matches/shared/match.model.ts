import { Player } from './../../players/shared/player.model';
export class Match {
  id: string;
  playerOne: Player;
  playerTwo: Player;
  playerOneScore: number;
  playerTwoScore: number;
  date: Date;

  constructor() {
    this.playerOne = new Player();
    this.playerTwo = new Player();
  }
}
