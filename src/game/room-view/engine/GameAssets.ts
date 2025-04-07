import {Assets} from "pixi.js";

export default class GameAssets {
  static async loadTiles() {
    await GameAssets.loadFloorTile();
    await GameAssets.loadHoverTile();
  };

  private static async loadFloorTile() {
    (await Assets.load('/src/assets/gamelib/gcompstd/tiles/floor_tile/floor_tile.png'))
      .source.scaleMode = "nearest";   // TODO: is scaleMod properly set?
  };

  private static async loadHoverTile() {
    (await Assets.load('/src/assets/gamelib/gcompstd/tiles/hover_tile/hover_tile.png'))
      .source.scaleMode = "nearest";
  };
};