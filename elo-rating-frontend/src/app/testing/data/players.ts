import { USERS } from './users';
import { Player } from './../../players/shared/player.model';

export const PLAYERS: Player[] = [
  { id: '123', 
    username: 'Player 1', 
    rating: 1000, 
    active: true, 
    user: null, 
    league: null,
    statistics: { won: 5, lost: 2 }
  },
  { id: '456', 
    username: 'Player 2', 
    rating: 500, 
    active: true, 
    user: null, 
    league: null,
    statistics: { won: 0, lost: 1 }
  },
  { id: '789', 
    username: 'Player 3', 
    rating: 1200, 
    active: true, 
    user: null, 
    league: null,
    statistics: { won: 0, lost: 0 } 
  },
  { id: '987', 
    username: 'Player 4', 
    rating: 2100, 
    active: false, 
    user: null, 
    league: null,
    statistics: { won: 0, lost: 0 } 
  },
  { id: '654', 
    username: 'Player 5', 
    rating: 700, 
    active: false, 
    user: USERS[0], 
    league: null,
    statistics: { won: 1, lost: 0 } 
  },
]
