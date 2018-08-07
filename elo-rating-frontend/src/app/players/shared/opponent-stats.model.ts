import {Player} from './player.model';

export class OpponentStats {
    opponent: Player;
    won: number;
    lost: number;
    pointsGained: number;
    streak: number;
    total: number;
}
