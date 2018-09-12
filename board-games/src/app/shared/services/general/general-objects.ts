import { Games } from "app/logic/games";
import { Player } from "app/shared/player";
import { Injectable } from "@angular/core";

export class ServiceHelper {

    public static socket: any;
    public static joinedGame: Games = null;
    public static currentPlayer: Player = new Player("generic_player_local", "", 0, 0);

}