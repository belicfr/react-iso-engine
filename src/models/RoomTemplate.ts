import {TileSituation} from "../../../iso-engine/src/scene/buildRoomScene.ts";

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
            value: tileDigit,
            isEntrance: tileDigit === TileDigit.ENTRANCE,
          });
        }
      }
    }

    return tilesPositions;
  };
};

enum TileDigit {
  VOID = "0",
  ENTRANCE = "E",
}