import { Player } from "app/shared/player";
import { SystemMessage } from "app/shared/system-message";

export class ConnectFourStatus {

    public gameId: number;
    public squaresStatus: Array<Player>;
    public winnerCombination: any;
    public currentTurn: Player;
    public gameOver: boolean;
    public playersConnected: Array<Player>;
    public systemMessage: SystemMessage;

    constructor(gameID: number) {

        this.gameId = gameID;
        this.squaresStatus = new Array<Player>();
        this.winnerCombination = [];
        this.currentTurn = new Player("generic_player", "", 0, 0);
        this.gameOver = false;
        this.playersConnected = new Array<Player>();
        this.systemMessage = new SystemMessage(true, "");
        
    }

}