export class User {

    private id: number;
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getId(): number {
        return this.id;
    }
}
