import { User } from "app/shared/user";
import { SystemMessage } from "app/shared/system-message";

export class TicTacToeStatus {

    public squaresStatus: Array<User>;
    public winnerCombination: any;
    public currentTurn: User;
    public gameOver: boolean;
    public playersConnected: Array<User>;
    public charactersFromPlayers: Array<string>;
    public systemMessage: SystemMessage;

    constructor() {

        this.squaresStatus = new Array<User>();
        this.winnerCombination = [];
        this.currentTurn = new User("generic_user", "");
        this.gameOver = false;
        this.playersConnected = new Array<User>();
        this.charactersFromPlayers = new Array<string>();
        this.systemMessage = new SystemMessage(true, "");
        
    }

}