import Tile from "../entities/Tile.ts";
import {RoomGrid} from "./RoomGrid.ts";
import {Size2D} from "./precepts/Size2D.ts";
import {Assets, Polygon, Sprite} from "pixi.js";

export default class GameRoom {
  private _options: RoomOptions;
  private _grid: RoomGrid;
  private _tiles: Tile[];

  constructor(options: RoomOptions) {
    this._options = options;
    this._grid = this.getGridSize();
    this._tiles = [];
  };

  private getGridSize(): RoomGrid {
    return {
      width: (this.options.gridSize.cols + this.options.gridSize.rows) * (this.options.tileSize.width / 4),
      height: (this.options.gridSize.cols + this.options.gridSize.rows) * (this.options.tileSize.height / 2),
    };
  };

  createHoverTile(): Tile {
    const texture = Assets.get('/src/assets/gamelib/gcompstd/tiles/hover_tile/hover_tile.png');

    const hoverTileSprite = new Sprite(texture);
    hoverTileSprite.alpha = 1;
    hoverTileSprite.anchor.set(0.5, 0.5);

    // hoverTile.zIndex = 100;

    return new Tile(hoverTileSprite, 0, 0);
  };

  createTerrain(): void {
    const gridSize = this.options.gridSize;
    const tileSize = this.options.tileSize;

    for (let y = 0; y < gridSize.rows; y++) {
      for (let x = 0; x < gridSize.cols; x++) {
        const isoX = (x - y) * (tileSize.width / 2);
        const isoY = (x + y) * (tileSize.height / 2);

        const tileSprite = new Sprite(
          Assets.get('/src/assets/gamelib/gcompstd/tiles/floor_tile/floor_tile.png')
        );

        tileSprite.hitArea = new Polygon([
          0, tileSize.height / 2,
          tileSize.width / 2, 0,
          tileSize.width, tileSize.height / 2,
          tileSize.width / 2, tileSize.height
        ]);

        tileSprite.anchor.set(0.5, 0.5);  // Centre la tuile
        tileSprite.x = isoX;
        tileSprite.y = isoY;
        tileSprite.alpha = 1;
        tileSprite.interactive = true;

        const tile = new Tile(tileSprite, x, y);

        this.tiles.push(tile);
      }
    }
  };

  get options(): RoomOptions {
    return this._options;
  };

  get tiles(): Tile[] {
    return this._tiles;
  };

  get grid(): RoomGrid {
    return this._grid;
  };
};

export type RoomOptions = {
  gridSize: {rows: number, cols: number},
  tileSize: Size2D,
};