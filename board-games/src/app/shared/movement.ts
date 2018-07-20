import { Games } from "../logic/games";

export class Movement {

    private game: Games;
    private message: string;

    constructor(game: Games) {
        this.game = game;
    }

    public addMessage(message: string): void {
        this.message = message;
    }
}
