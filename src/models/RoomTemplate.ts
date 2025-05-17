import {Coord2D} from "../game/room-view/engine/precepts/Coord2D.ts";

export default class RoomTemplate {
  static generate(template: string): TileSituation[] {
    const rows: string[] = template
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
};

export type TileSituation = Coord2D & {
  isEntrance: boolean,
};

enum TileDigit {
  VOID = "0",
  ENTRANCE = "E",
}