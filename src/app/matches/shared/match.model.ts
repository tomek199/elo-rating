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

  isValid(validateScore: boolean): boolean {
    let playersValidation = this.playerOne.id
      && this.playerTwo.id
      && this.playerOne.id != this.playerTwo.id;
    if (validateScore) {
      return playersValidation 
        && this.playerOneScore != undefined
        && this.playerTwoScore != undefined;
    } else {
      return playersValidation;
    }
  }
}
