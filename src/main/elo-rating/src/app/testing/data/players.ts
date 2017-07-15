import { Player } from './../../players/shared/player.model';
import { PlayerStats } from './../../players/shared/player-stats.model';

export const PLAYERS: Player[] = [
  { id: '123', username: 'Player 1', rating: 1000, active: true },
  { id: '456', username: 'Player 2', rating: 500, active: true },
  { id: '789', username: 'Player 3', rating: 1200, active: true },
  { id: '987', username: 'Player 4', rating: 2100, active: false },
  { id: '654', username: 'Player 5', rating: 700, active: false },

]

export function getPlayersStats(): Map<string, PlayerStats> {
  let playersStats = new Map<string, PlayerStats>();
  playersStats.set('123', {id: '123', username: 'Player 1', rating: 1000, active: true, wins: 11, loses: 1});
  playersStats.set('456', { id: '456', username: 'Player 2', rating: 500, active: true, wins: 12, loses: 2 });
  playersStats.set('789', { id: '789', username: 'Player 3', rating: 1200, active: true, wins: 13, loses: 3 });
  playersStats.set('987', { id: '987', username: 'Player 4', rating: 2100, active: false, wins: 14, loses: 4 });

  return playersStats;
};

export const PLAYERS_STATS = this.getPlayersStats();