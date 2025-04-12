import {Sprite} from "pixi.js";

export default class Tile {
  private _sprite: Sprite;
  private _isOccupied: boolean;

  gridX: number;
  gridY: number;

  constructor(sprite: Sprite, gridX: number, gridY: number) {
    this._sprite = sprite;
    this._isOccupied = false;

    this.gridX = gridX;
    this.gridY = gridY;
  }

  get sprite(): Sprite {
    return this._sprite;
  }

  set sprite(value: Sprite) {
    this._sprite = value;
  }

  get isOccupied(): boolean {
    return this._isOccupied;
  }

  set isOccupied(value: boolean) {
    this._isOccupied = value;
  }
};