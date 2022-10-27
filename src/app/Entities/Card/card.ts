export class Card {
    public code: string;
    public image: string;
    public images: any;
    public value: string;
    public suit: string;

    constructor(code?: string, image?: string, images?: any, value?: string, suit?: string) {
        this.code = code ?? "";
        this.image = image ?? "";
        this.images = images ?? "";
        this.value = value ?? "";
        this.suit = suit ?? "";
    }

    public getName(){
        return this.value.toString() + " " + this.suit.toString();
    }

    getImg(){
        return this.image;
    }
}

