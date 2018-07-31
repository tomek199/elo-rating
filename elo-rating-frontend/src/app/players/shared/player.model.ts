import {League} from 'app/leagues/shared/league.model';
import {User} from './../../users/shared/user.model';
import {PlayerStats} from 'app/players/shared/player-stats.model';

export class Player {
  id: string;
  username: string;
  rating: number;
  active: boolean;
  statistics: PlayerStats;
  user: User;
  league: League;

  constructor(id?: string, username?: string) {
    this.id = id;
    this.username = name;
  }
}
