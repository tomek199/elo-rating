export class QueueElement {

    constructor(private player1: string, private player2: string) {}

    getPlayer1(): string {
        return this.player1;
    }

    getPlayer2(): string {
        return this.player2;
    }
}