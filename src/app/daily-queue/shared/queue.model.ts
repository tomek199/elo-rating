import { QueueElement } from './queueElement.model';
export class Queue {
    
    id: string;
    name: string; 
    description?: string;
    matches: QueueElement[];
}