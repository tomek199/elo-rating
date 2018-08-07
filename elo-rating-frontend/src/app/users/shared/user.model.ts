import {Player} from './../../players/shared/player.model';
import {League} from './../../leagues/shared/league.model';
import {EmailsNotifications} from 'app/users/shared/emailsNotifications.model';

export class User {
  id: string;
  googleId: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  pictureUrl: string;
  lastSignIn: Date;
  leagues: League[];
  players: Player[];
  emailsNotifications: EmailsNotifications;
  timezone: string;
}
