export class Quiz {
    public user: string;
    public name: string;
    public lastName: string;
    public age: string;
    public phone: string;
    public faction: string;
    public game_HangedUp: boolean;
    public game_HigherLower: boolean;
    public game_Asked: boolean;
    public game_GuessWho: boolean;
    public comments: string;

    constructor(user?: string, name?: string, lastName?: string, age?: string, phone?: string, faction?: string, game_HangedUp?: boolean, game_HigherLower?: boolean, game_Asked?: boolean, game_GuessWho?: boolean, comments?: string) {
        this.user = user ?? ""
        this.name = name ?? "";
        this.lastName = lastName ?? "";
        this.age = age ?? "";
        this.phone = phone ?? "";
        this.faction = faction ?? "";
        this.game_HangedUp = game_HangedUp ?? false;
        this.game_HigherLower = game_HigherLower ?? false;
        this.game_Asked = game_Asked ?? false;
        this.game_GuessWho = game_GuessWho ?? false;
        this.comments = comments ?? "";
    }
}
