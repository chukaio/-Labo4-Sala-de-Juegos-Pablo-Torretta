import { Card } from "../Card/card";

export class Deck {
    public deck_id: string;
    public remaining: number;
    public cards: Card[];

    constructor(id?: string, cardsLeft?: number, cards?: Card[]) {
        this.deck_id = id ?? "";
        this.remaining = cardsLeft ?? 0;
        this.cards = cards ?? [];
    }
}
