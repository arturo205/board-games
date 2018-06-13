export class User {

    public socketId: string;
    public userName: string;
    public password: string;

    constructor(userName: string, password: string) {

        this.socketId = "";
        this.userName = userName;
        this.password = password;

    }

}
