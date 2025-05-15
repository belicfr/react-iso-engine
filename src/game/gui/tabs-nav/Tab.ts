export default class Tab {
  label: string;
  sender?: string;

  constructor(label: string, sender?: string) {
    this.label = label;
    this.sender = sender;
  }
};