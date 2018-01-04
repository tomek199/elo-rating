import { Player } from 'app/players/shared/player.model';
import { User } from './../../users/shared/user.model';
import { League } from 'app/leagues/shared/league.model';
export const USERS: User[] = [
  {
    id: '123',
    googleId: '123456',
    name: 'Test User 1',
    givenName: 'Test',
    familyName: 'User 1',
    email: 'user1@mail.com',
    pictureUrl: 'https://img.com',
    lastSignIn: new Date(),
    leagues: [ new League() ],
    players: [ new Player() ],
  }
]