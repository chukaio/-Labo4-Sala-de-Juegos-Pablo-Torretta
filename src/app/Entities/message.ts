import { Timestamp } from "firebase/firestore";

export class Message {
    public user: string;
    public text: string;
    public createdAt: string;

    constructor(u: string, t: string, c: string) {
        this.user = u;
        this.text = t;
        this.createdAt = c;
    }
}
