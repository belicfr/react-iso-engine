import {FC, useEffect, useMemo, useRef, useState} from "react";
import {Assets, Rectangle, Sprite, Texture} from 'pixi.js';
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";

type Props = Coord2D & {
  z: number,
};

export const PlayerAvatar: FC<Props> = ({x, y, z}) => {
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
  });

  const [ texture, setTexture ] = useState(Texture.EMPTY);

  const avatar = useRef<Sprite>(null);

  const isAvatarScaleModeDefined = useRef<boolean>(false);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load("/src/assets/gamelib/avatars/avatarstub.png")
        .then(result => {
          setTexture(result);
        });
    } else if (!isAvatarScaleModeDefined.current) {
      texture.source.scaleMode = "nearest";
      isAvatarScaleModeDefined.current = true;
    }
  }, [texture]);

  return (
    <pixiSprite
      ref={avatar}
      texture={texture}
      hitArea={new Rectangle(
        TEXTURE_MARGINS.x,
        -SIZE.height,
        SIZE.width - TEXTURE_MARGINS.x,
        SIZE.height)}
      anchor={{x: 0, y: 1}}
      eventMode={"static"}
      x={x}
      y={y + SIZE.height/4 - TEXTURE_MARGINS.y/2}
      zIndex={z}
      alpha={1}
      interactive={true}

      onClick={e => console.log("check avatar click")}
    />
  );
};