import { Player } from "../../../shared/player";
import { SystemMessage } from "../../../shared/system-message";

export class TicTacToeStatus {

    public squaresStatus: Array<Player>;
    public winnerCombination: any;
    public currentTurn: Player;
    public gameOver: boolean;
    public playersConnected: Array<Player>;
    public charactersFromPlayers: Array<string>;
    public systemMessage: SystemMessage;

    constructor() {

        this.squaresStatus = new Array<Player>();
        this.winnerCombination = [];
        this.currentTurn = new Player("generic_player", "", 0, 0);
        this.gameOver = false;
        this.playersConnected = new Array<Player>();
        this.charactersFromPlayers = new Array<string>();
        this.systemMessage = new SystemMessage(true, "");
        
    }

}