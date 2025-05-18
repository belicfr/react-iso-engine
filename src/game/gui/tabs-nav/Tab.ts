export default class Tab {
  label: string;
  channel?: string;

  constructor(label: string, channel?: string) {
    this.label = label;
    this.channel = channel;
  }
};