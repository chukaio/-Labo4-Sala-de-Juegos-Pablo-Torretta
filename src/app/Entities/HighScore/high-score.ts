export class HighScore {
    public user: string;
    public date: string;
    public score: number;

    constructor(user?: string, date?: string, score?: number) {
        this.user = user ?? "";
        this.date = date ?? "";
        this.score = score ?? 0;
    }
}
