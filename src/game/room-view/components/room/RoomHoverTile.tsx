import {FC} from "react";
import {Assets, Polygon, Texture} from 'pixi.js';
import {useEffect, useRef, useState} from 'react';
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";

type Props = {
  position: Coord2D,
  tileSize: Size2D,
  z: number,
  visible: boolean,

  onClick: (pos: Coord2D) => void,
};

export const RoomHoverTile: FC<Props> = ({position, tileSize, z, visible, onClick}) => {
  const [texture, setTexture] = useState(Texture.EMPTY);

  const isTileScaleModeDefined = useRef<boolean>(false);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load("/src/assets/gamelib/gcompstd/tiles/hover_tile/hover_tile.png")
        .then((result) => {
          setTexture(result);
        });
    } else if (!isTileScaleModeDefined.current) {
      texture.source.scaleMode = "nearest";
      isTileScaleModeDefined.current = true;
    }
  }, [texture]);

  return (
    <pixiSprite
      texture={texture}
      hitArea={new Polygon([
        0, tileSize.height / 2,
        tileSize.width / 2, 0,
        tileSize.width, tileSize.height / 2,
        tileSize.width / 2, tileSize.height
      ])}
      anchor={0}
      eventMode={'none'}
      x={position.x}
      y={position.y}
      zIndex={z}
      alpha={1}
      visible={visible}

      onClick={e => onClick({x: e.target.x, y: e.target.y})}
    />
  );
};