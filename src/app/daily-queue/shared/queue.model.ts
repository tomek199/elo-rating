import { Match } from './../../matches/shared/match.model';
export class Queue {
    
    id: string;
    name: string; 
    description?: string;
    matches: Match[];
}