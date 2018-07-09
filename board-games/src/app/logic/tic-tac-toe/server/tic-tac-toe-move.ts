import { User } from "app/shared/user";

export class TicTacToeMove {

    public user: User;
    public selectedPosition: number;

    constructor(user: User, selectedPosition: number) {
        this.user = user;
        this.selectedPosition = selectedPosition;
    }

}