import {Texture} from "pixi.js";

export default class AvatarEffect {
  code: number;
  source: Source;

  constructor(code: number, source: Source) {
    this.code = code;
    this.source = source;
  };

  static all(): AvatarEffect[] {
    const path: string = "/src/assets/gamelib/avatarfx";

    return [
      new AvatarEffect(EAvatarEffect.NONE, `${path}/none.fx/none.png`),
      new AvatarEffect(EAvatarEffect.STAFF, `${path}/staff.fx/staff.png`),
    ];
  };

  static findByCode(code: EAvatarEffect): AvatarEffect {
    return AvatarEffect.all().find(effect => effect.code === code)!;
  }
};

type Source = string|Texture;

export enum EAvatarEffect {
  NONE = 0,
  STAFF = 999,
}