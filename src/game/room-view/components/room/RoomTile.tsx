import {FC, useEffect, useRef, useState} from "react";
import {Assets, Polygon, Sprite, Texture} from 'pixi.js';
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";

type Props = {
  position: Coord2D,
  tileSize: Size2D,

  onHoverTile: (pos: Coord2D) => void,
};

export const RoomTile: FC<Props> = ({position, tileSize, onHoverTile}) => {
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
    <pixiContainer
      x={position.x}
      y={position.y}
      anchor={0}
      eventMode={'static'}
      sortableChildren={true}

      onMouseEnter={e =>
        onHoverTile({x: e.target.x, y: e.target.y})}
    >

      <pixiSprite
        ref={tile}
        texture={texture}
        hitArea={new Polygon([
          0, tileSize.height / 2,
          tileSize.width / 2, 0,
          tileSize.width, tileSize.height / 2,
          tileSize.width / 2, tileSize.height
        ])}
        alpha={1}
        interactive={true}
        zIndex={0}
      />
    </pixiContainer>
  );
};