export enum Games {
    Login = "Login",
    TicTacToe = "TicTacToe",
    ConnectFour = "ConnectFour",
    Other = "Other"
}

export class AllGames {

    public static getGame(gameName: string): Games {
        let foundGame: Games = Games.Other;

        switch(gameName) {
            case "Login": foundGame = Games.Login; break;
            case "TicTacToe": foundGame = Games.TicTacToe; break;
            case "ConnectFour": foundGame = Games.ConnectFour; break;
            default: foundGame = Games.Other; break;
        }

        return foundGame;
    }

}