import {Application, Sprite} from "pixi.js";

export default class Game {
  private _app: Application;
  private _environmentOptions: object;
  private _gameOptions: GameOptions;

  constructor(
    environmentOptions: object = {},
    gameOptions: GameOptions,
    cb: GameCallback) {

    this._app = new Application();
    this._environmentOptions = environmentOptions;
    this._gameOptions = gameOptions;

    this.init()
      .then(() => cb(this.app.canvas));
  }

  private async init() {
    await this._app.init(this.environmentOptions);
    // await this._app.renderer.generateTexture({
    //   textureSourceOptions: {
    //     scaleMode: "nearest",
    //   },
    // });
  }

  addChild(sprite: Sprite): void {
    this.app.stage.addChild(sprite);
  };

  get app(): Application {
    return this._app;
  }

  get environmentOptions(): object {
    return this._environmentOptions;
  }

  get gameOptions(): GameOptions {
    return this._gameOptions;
  }
};

export type GameCallback = (canvas: HTMLCanvasElement) => void;
export type GameOptions = {
  tileSize: {width: number, height: number},
};