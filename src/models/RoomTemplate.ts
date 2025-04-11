export default class RoomTemplate {
  id: number;
  template: string;
  name: string;
  tilesCount: number;

  constructor(id: number, template: string, name: string, tiles: number) {
    this.id = id;
    this.template = template;
    this.name = name;
    this.tilesCount = tiles;
  }
};