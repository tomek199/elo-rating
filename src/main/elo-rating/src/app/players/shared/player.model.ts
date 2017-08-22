import { League } from 'app/leagues/shared/league.model';
import { User } from './../../users/shared/user.model';
export class Player {
  id: string;
  username: string;
  rating: number;
  active: boolean;
  user: User;
  league: League;

  constructor(id?: string, username?: string) {
    this.id = id;
    this.username = name;
  }
}