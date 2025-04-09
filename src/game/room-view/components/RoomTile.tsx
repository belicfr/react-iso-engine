import {FC, useEffect, useRef, useState} from "react";
import {Assets, Polygon, Sprite, Texture} from 'pixi.js';
import {Size2D} from "../engine/precepts/Size2D.ts";
import {Coord2D} from "../engine/precepts/Coord2D.ts";
import {useApplication} from "@pixi/react";

type Props = {
  position: Coord2D,
  gridPos: Coord2D,
  tileSize: Size2D,

  onHoverTile: (pos: Coord2D) => void,
};

export const RoomTile: FC<Props> = ({position, gridPos, tileSize, onHoverTile}) => {
  const {app} = useApplication();

  const [texture, setTexture] = useState(Texture.EMPTY);

  const isTileScaleModeDefined = useRef<boolean>(false);

  const tile = useRef<Sprite>(null);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load("/src/assets/gamelib/gcompstd/tiles/floor_tile/floor_tile.png")
        .then((result) => {
          setTexture(result);
        });
    } else if (!isTileScaleModeDefined.current) {
      texture.source.scaleMode = "nearest";
      isTileScaleModeDefined.current = true;
    }
  }, [texture]);

  return (
    // TODO: wrap sprite into container for keeping hover tile if furni hover tile
    <pixiSprite
      ref={tile}
      texture={texture}
      hitArea={new Polygon([
        0, tileSize.height / 2,
        tileSize.width / 2, 0,
        tileSize.width, tileSize.height / 2,
        tileSize.width / 2, tileSize.height
      ])}
      anchor={0}
      eventMode={'static'}
      x={position.x}
      y={position.y}
      alpha={1}
      interactive={true}

      onMouseEnter={(e) =>
        onHoverTile({x: e.target.x, y: e.target.y})}
    />
  );
};