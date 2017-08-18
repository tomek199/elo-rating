import { Player } from './../../players/shared/player.model';
import { League } from './../../leagues/shared/league.model';

export class User {
  id: string;
  googleId: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  pictureUrl: string;
  leagues: League[];
  player: Player;
}
