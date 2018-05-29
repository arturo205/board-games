export class TicTacToeLogic {

    public static squaresState: Array<string> = new Array<string>();
    private static winnerCombinations: Array<{keyA: number, keyB: number, keyC: number}> = new Array<any>();
    public static winnerCombination: any;
    public static turn: boolean = true;
    public static message: string = " ";
    public static turnMessage: string = " ";
    private static playerOneValue: string = "O";
    private static playerTwoValue: string = "X";
    public static gameOver: boolean = false;
  
    constructor() { }
  
    public static initializeLogic(initialArray: Array<string>): void {
        this.initializeVariables();
        this.buildMovementsToWin();
        initialArray.forEach((value) => {
            this.squaresState.push(value);
        });
        this.updateTurnMessage();
    }

    private static initializeVariables(): void {
        this.squaresState.splice(0, this.squaresState.length);
        this.turn = true;
        this.message = " ";
        this.turnMessage = " ";
        this.gameOver = false;
        this.winnerCombination = null;
    }

    public static performMove(key: number): void {
        if (!this.gameOver) {
            if (!this.squaresState[key].includes(this.playerOneValue) && !this.squaresState[key].includes(this.playerTwoValue)) {
                this.squaresState[key] = this.getCurrentTurnValue();
                let winnerCombinationIndex = this.checkForWinner();
                if (winnerCombinationIndex === -1) {
                    this.turn = !this.turn;
                    this.updateTurnMessage();
                }
                else {
                    this.message = "Congratulations!!! Player " + this.getCurrentTurnValue() + " won!!!";
                    this.gameOver = true;
                    this.winnerCombination = this.winnerCombinations[winnerCombinationIndex];
                }
            }
            else {
                this.message = "Cannot choose this square! Please choose another one!";
            }
        }
    }

    private static buildMovementsToWin(): void {
        this.winnerCombinations.splice(0, this.winnerCombinations.length);
        this.winnerCombinations.push({keyA:0, keyB:1, keyC:2});
        this.winnerCombinations.push({keyA:3, keyB:4, keyC:5});
        this.winnerCombinations.push({keyA:6, keyB:7, keyC:8});
        this.winnerCombinations.push({keyA:0, keyB:3, keyC:6});
        this.winnerCombinations.push({keyA:1, keyB:4, keyC:7});
        this.winnerCombinations.push({keyA:2, keyB:5, keyC:8});
        this.winnerCombinations.push({keyA:0, keyB:4, keyC:8});
        this.winnerCombinations.push({keyA:2, keyB:4, keyC:6});
    }

    public static updateTurnMessage(): void {
        this.turnMessage = "Player " + this.getCurrentTurnValue() + " please make your move!";
        this.message = "";
    }

    public static getCurrentTurnValue(): string {
        return (this.turn) ? this.playerOneValue : this.playerTwoValue;
    }

    public static getState(key: number): string {
        return this.squaresState[key];
    }

    public static checkForWinner(): number {
        let winnerCombination: number = -1;
        this.winnerCombinations.forEach((combination, index) => {
            if (this.checkLineForWinner(combination.keyA, combination.keyB, combination.keyC)) {
                winnerCombination = index;
            }
        });
        return winnerCombination;
    }

    public static checkLineForWinner(keyA: number, keyB: number, keyC: number) {
        let result = false;

        if (this.getCurrentTurnValue() === this.squaresState[keyA] && this.getCurrentTurnValue() === this.squaresState[keyB] &&
        this.getCurrentTurnValue() === this.squaresState[keyC]) {
            result = true;
        }

        return result;
    }
  
  }
  