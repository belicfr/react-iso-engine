import {FC} from "react";
import {Assets, Polygon, Texture} from 'pixi.js';
import {useEffect, useRef, useState} from 'react';
import { useTick } from '@pixi/react';
import {Size2D} from "../engine/precepts/Size2D.ts";

type Props = {
  gridSize: GridSize,
};

export const RoomFloor: FC<Props> = ({gridSize}) => {
  const tiles = [];

  const TILE_SIZE: Size2D = {
    width: 72,
    height: 36,
  };

  const [texture, setTexture] = useState(Texture.EMPTY);

  for (let y = 0; y < gridSize.rows; y++) {
    for (let x = 0; x < gridSize.cols; x++) {
      const isoX = (x - y) * (TILE_SIZE.width / 2);
      const isoY = (x + y) * (TILE_SIZE.height / 2);

      tiles.push((
        <pixiSprite
          texture={texture}
          hitArea={new Polygon([
            0, TILE_SIZE.height / 2,
            TILE_SIZE.width / 2, 0,
            TILE_SIZE.width, TILE_SIZE.height / 2,
            TILE_SIZE.width / 2, TILE_SIZE.height
          ])}
          anchor={{x: .5, y: .5}}
          x={isoX}
          y={isoY}
          alpha={1}
          interactive={true}
        />
      ));
    }
  }

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets
        .load("/src/assets/gamelib/gcompstd/tiles/floor_tile/floor_tile.png")
        .then((result) => {
          setTexture(result)
        });
    }
  }, [texture]);

  return (
    <pixiContainer
      anchor={0.5}
      eventMode={'static'}
      x={100}
      y={100}
    >

      {tiles}
    </pixiContainer>
  );
};

export type GridSize = {
  cols: number,
  rows: number,
};