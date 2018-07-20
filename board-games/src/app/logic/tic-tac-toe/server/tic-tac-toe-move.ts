import { Player } from "../../../shared/player";

export class TicTacToeMove {

    public player: Player;
    public selectedPosition: number;

    constructor(player: Player, selectedPosition: number) {
        this.player = player;
        this.selectedPosition = selectedPosition;
    }

}