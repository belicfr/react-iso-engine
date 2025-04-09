import {Size2D} from "./Size2D.ts";
import {ApplicationRef} from "@pixi/react";
import {Coord2D} from "./Coord2D.ts";
import {Sprite} from "pixi.js";

export default class ScreenIso {
  static screenToIso(
    screenX: number,
    screenY: number,
    tileSize: Size2D,
    app: ApplicationRef,
    tile: Sprite,
    gridPos: Coord2D) {

    const stage = app.getApplication()?.stage;

    if (!stage || !tile) {
      return {x: 0, y: 0};
    }

    const scale = stage.scale.x;
    const stageX = (screenX - stage.x) / scale;
    const stageY = (screenY - stage.y) / scale;

    let targetTile = null;

    // Parcourt toutes les tiles pour voir où la souris est
    if (tile.containsPoint({ x: stageX, y: stageY })) {
      targetTile = tile;
    }

    if (!targetTile) {
      const gridX = Math.round((stageX / (tileSize.width / 2) + stageY / (tileSize.height / 2)) / 2);
      const gridY = Math.round((stageY / (tileSize.height / 2) - stageX / (tileSize.width / 2)) / 2);

      return { x: gridX, y: gridY };
    }

    return { x: gridPos.x, y: gridPos.y };
  };

  static isoToScreen(gridPos: Coord2D, tileSize: Size2D) {
    const isoX = (gridPos.x - gridPos.y) * (tileSize.width / 2);
    const isoY = (gridPos.x + gridPos.y) * (tileSize.height / 2);

    return { isoX, isoY };
  };
};