import { Player } from "app/shared/player";
import { GameMove } from "app/logic/general/server/game-move";

export class ConnectFourMove extends GameMove {

    constructor(player: Player, selectedPosition: number) {
        super(player, selectedPosition);
    }

}