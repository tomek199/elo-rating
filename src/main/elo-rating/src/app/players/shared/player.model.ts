import { User } from './../../users/shared/user.model';
export class Player {
  id: string;
  username: string;
  rating: number;
  active: boolean;
  user: User;
}