import { Player } from "app/shared/player";
import { GameMove } from "app/logic/general/server/game-move";

export class TicTacToeMove extends GameMove {

    constructor(player: Player, selectedPosition: number) {
        super(player, selectedPosition);
    }

}