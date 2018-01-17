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
    leagues: [ 
      new League('123', 'League 1'), 
      new League('456', 'League 2') 
    ],
    players: [ 
      new Player(), 
      new Player() 
    ],
  }, 
  {
    id: '456',
    googleId: '567890',
    name: 'Test User 2',
    givenName: 'Test',
    familyName: 'User 2',
    email: 'user2@mail.com',
    pictureUrl: 'https://img.com',
    lastSignIn: new Date(),
    leagues: [ ],
    players: [ ],
  }
]