export class Feedback {
  sender: string;
  text: string;

  constructor(sender?: string, text?: string) {
    this.sender = sender;
    this.text = text;
  }
}