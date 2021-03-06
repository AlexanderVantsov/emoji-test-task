export class Message {
    datetime: any;
    message_text: string;

    constructor(message: string) {
        this.message_text = message;
        this.datetime = new Date();
        console.log("New message", {m: this.message_text, d: this.datetime});
    }

}