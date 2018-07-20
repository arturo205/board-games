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

    public static getIconColor(index: number): string {
        
        let foundColor: string = "";

        switch (index) {
            case 0: foundColor = "rgb(252, 78, 78)"; break;
            case 1: foundColor = "rgb(160, 200, 255)"; break; 
            case 2: foundColor = "rgb(255, 240, 40)"; break; 
            case 3: foundColor = "rgb(255, 181, 33)"; break; 
            case 4: foundColor = "rgb(217, 107, 255)"; break; 
            case 5: foundColor = "rgb(168, 127, 70)"; break; 
            case 6: foundColor = "rgb(148, 226, 127)"; break; 
            case 7: foundColor = "rgb(73, 135, 56)"; break; 
            case 8: foundColor = "rgb(61, 92, 247)"; break; 
            case 9: foundColor = "rgb(188, 188, 188)"; break; 
            default: break;
        }

        return foundColor;

    }

    public static getIconImage(index: number): string {

        let foundIcon: string = "";
        
        switch (index) {
            case 0: foundIcon = "/assets/images/icon0.png"; break; 
            case 1: foundIcon = "/assets/images/icon1.png"; break;
            case 2: foundIcon = "/assets/images/icon2.png"; break; 
            case 3: foundIcon = "/assets/images/icon3.png"; break; 
            case 4: foundIcon = "/assets/images/icon4.png"; break; 
            case 5: foundIcon = "/assets/images/icon5.png"; break; 
            case 6: foundIcon = "/assets/images/icon6.png"; break; 
            case 7: foundIcon = "/assets/images/icon7.png"; break; 
            case 8: foundIcon = "/assets/images/icon8.png"; break; 
            case 9: foundIcon = "/assets/images/icon9.png"; break; 
            default: break;
        }

        return foundIcon;

    }

}