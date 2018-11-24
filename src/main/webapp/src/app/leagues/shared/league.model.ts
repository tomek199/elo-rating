import {LeagueSettings} from './league-settings';
import {User} from './../../users/shared/user.model';

export class League {
  id: string;
  name: string;
  users: User[];
  settings: LeagueSettings;

  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name;
  }
}
