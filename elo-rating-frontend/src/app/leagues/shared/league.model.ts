import { User } from './../../users/shared/user.model';
export class League {
  id: string;
  name: string;
  users: User[];

  constructor(id?: string, name?: string) {
    this.id = id;
    this.name = name;
  }
}