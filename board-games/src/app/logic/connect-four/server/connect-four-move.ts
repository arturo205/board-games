import { Player } from "app/shared/player";

export class ConnectFourMove {

    public player: Player;
    public selectedPosition: number;

    constructor(player: Player, selectedPosition: number) {
        this.player = player;
        this.selectedPosition = selectedPosition;
    }

}