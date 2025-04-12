import {Coord2D} from "../game/room-view/engine/precepts/Coord2D.ts";

export class RoomTemplateRepository {
  static instance: RoomTemplateRepository;

  templates: RoomTemplate[];

  constructor() {
    this.templates = [];
  }

  static i(): RoomTemplateRepository {
    if (!RoomTemplateRepository.instance) {
      RoomTemplateRepository.instance = new RoomTemplateRepository();
    }

    return RoomTemplateRepository.instance;
  };
}

export default class RoomTemplate {
  id: number;
  template: string;
  name: string;

  constructor(id: number, template: string, name: string) {
    this.id = id;
    this.template = template;
    this.name = name;

    this.tilesCount();
  }

  generate(): Coord2D[] {
    const rows: string[] = this
      .template
      .split('\n')
      .map(row => row.trim());

    const tilesPositions: Coord2D[] = [];

    let row: string;
    let tilesDigits: string[];
    let tileDigit: string;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      row = rows[rowIndex];
      tilesDigits = row.split('');

      for (let tileDigitIndex = 0; tileDigitIndex < tilesDigits.length; tileDigitIndex++) {
        tileDigit = tilesDigits[tileDigitIndex];

        if (tileDigit !== TileDigit.VOID) {
          tilesPositions.push({
            x: rowIndex,
            y: tileDigitIndex,
          });
        }
      }
    }

    return tilesPositions;
  };

  tilesCount(): RegExpStringIterator<RegExpExecArray> {
    const tilesDigits
      = this.template.search(/[1-9]+/g);

    console.log(tilesDigits);

    return tilesDigits;
  };
};

enum TileDigit {
  VOID = "0",
}