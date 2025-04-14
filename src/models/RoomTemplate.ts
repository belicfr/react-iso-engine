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

  generate(): TileSituation[] {
    const rows: string[] = this
      .template
      .split('\n')
      .map(row => row.trim());

    const tilesPositions: TileSituation[] = [];

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
            isEntrance: tileDigit === TileDigit.ENTRANCE,
          });
        }
      }
    }

    return tilesPositions;
  };

  tilesCount(): number {
    const tilesDigits
      = this.template.search(/[1-9]+/g);

    console.log(tilesDigits);

    return tilesDigits;
  };
};

export type TileSituation = Coord2D & {
  isEntrance: boolean,
};

enum TileDigit {
  VOID = "0",
  ENTRANCE = "E",
}