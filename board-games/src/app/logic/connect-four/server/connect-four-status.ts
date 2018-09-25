import { GameStatus } from "app/logic/general/server/game-status";

export class ConnectFourStatus extends GameStatus {

    public boardWidth: number;
    public boardHeight: number;

    constructor(gameID: number) {

        super(gameID);
        this.boardWidth = 7;
        this.boardHeight = 6;
        
    }

}