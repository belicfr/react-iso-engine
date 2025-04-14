import {FC, useEffect, useMemo, useRef, useState} from "react";
import {Assets, Rectangle, Sprite, Texture} from 'pixi.js';
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";
import User from "../../../../models/User.ts";

type Props = Coord2D & {
  z: number,
  user: User,
};

export const PlayerAvatar: FC<Props> = ({x, y, z, user}) => {
  const ANCHORS: Coord2D = {x: 0, y: 1};

  const SIZE: Size2D = useMemo<Size2D>(() => {
    return {
      width: 72,
      height: 144,
    };
  }, []);

  const TEXTURE_MARGINS: Coord2D = useMemo<Coord2D>(() => {
    return {
      x: 12,
      y: 10,
    };
  }, []);

  const [ avatarTexture, setAvatarTexture ] = useState(Texture.EMPTY);
  const [ effectTexture, setEffectTexture ] = useState(Texture.EMPTY);

  const effect = useRef<Sprite>(null);
  const avatar = useRef<Sprite>(null);

  const isEffectScaleModeDefined = useRef<boolean>(false);
  const isAvatarScaleModeDefined = useRef<boolean>(false);

  useEffect(() => {
    if (avatarTexture === Texture.EMPTY) {
      Assets
        // TODO: .containsPoint to allow click through avatar if target pixel is transparent
        .load("/src/assets/gamelib/avatars/avatarstub.png")
        .then(result => {
          setAvatarTexture(result);
        });
    } else if (!isAvatarScaleModeDefined.current && avatarTexture) {
      avatarTexture.source.scaleMode = "nearest";
      isAvatarScaleModeDefined.current = true;
    }
  }, [avatarTexture]);

  useEffect(() => {
    if (effectTexture === Texture.EMPTY) {
      Assets
        .load(user.avatarEffect.source)
        .then(result => {
          setEffectTexture(result);
        });
    } else if (!isEffectScaleModeDefined.current && effectTexture) {
      effectTexture.source.scaleMode = "nearest";
      isEffectScaleModeDefined.current = true;
    }
  }, [effectTexture, user]);

  return (
    <pixiContainer
      x={x}
      y={y + SIZE.height / 4 - TEXTURE_MARGINS.y / 2}
      zIndex={z}
      sortableChildren={true}
    >

      <pixiSprite
        ref={effect}
        texture={effectTexture}
        interactive={false}
        zIndex={1}
        anchor={ANCHORS}
        x={-12}
        y={0}
      />

      <pixiSprite
        ref={avatar}
        texture={avatarTexture}
        hitArea={new Rectangle(
          TEXTURE_MARGINS.x,
          -SIZE.height,
          SIZE.width - TEXTURE_MARGINS.x,
          SIZE.height)}
        eventMode={"static"}
        interactive={true}
        zIndex={0}
        anchor={ANCHORS}
        x={0}
        y={0}

        onClick={e => console.log("check avatar click")}
      />
    </pixiContainer>
  );
};