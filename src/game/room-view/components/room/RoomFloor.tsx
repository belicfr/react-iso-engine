import {FC, useEffect, useMemo, useRef, useState} from "react";
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {extend, useApplication} from "@pixi/react";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";
import {RoomTile} from "./RoomTile.tsx";
import {Container, Graphics, Sprite} from "pixi.js";
import {RoomHoverTile} from "./RoomHoverTile.tsx";
import {GridSize} from "../../../../models/Room.ts";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  gridSize: GridSize,
};

export const  RoomFloor: FC<Props> = ({gridSize}) => {
  const a = useApplication();
  const {app} = a;
  
  const TILE_SIZE = useMemo<Size2D>(() => ({
    width: 72,
    height: 36,
  }), []);

  const scaleFactor = useRef<number>(1);
  const oldScaleFactor = useRef<number>(1);

  const isEnvZoomEventDefined = useRef<boolean>(false);

  const [hoverTilePosition, setHoverTilePosition] = useState<Coord2D>({x: 0, y: 0});

  const tiles = useMemo(() => {
    const tiles = [];

    for (let y = 0; y < gridSize.rows; y++) {
      for (let x = 0; x < gridSize.cols; x++) {
        const isoX = (x - y) * (TILE_SIZE.width / 2);
        const isoY = (x + y) * (TILE_SIZE.height / 2);

        tiles.push((
          <RoomTile
            key={`${x},${y}`}
            position={{x: isoX, y: isoY}}
            tileSize={TILE_SIZE}

            onHoverTile={(pos: Coord2D) => {
              setHoverTilePosition(pos);
            }}
          />
        ));
      }
    }

    return tiles;
  }, [gridSize.rows, gridSize.cols, TILE_SIZE]);

  useEffect(() => {
    if (!app || !app.renderer || !app.canvas) return;

    const canvas: HTMLCanvasElement = app.canvas;

    console.log("check global");

    const zoomEvent = (e: WheelEvent) => {
      console.log("wheel check");
      const zoomSpeed = 0.1;
      const scrollThreshold = 5;

      if (Math.abs(e.deltaY) > scrollThreshold) {
        oldScaleFactor.current = scaleFactor.current;

        if (e.deltaY < 0) {
          scaleFactor.current += zoomSpeed;
        } else {
          scaleFactor.current -= zoomSpeed;
        }

        scaleFactor.current = Math.max(0.5, Math.min(5, scaleFactor.current));

        const mousePosition = app.renderer.events.pointer.global;

        const newX = mousePosition.x - (mousePosition.x - app.stage.x) * (scaleFactor.current / oldScaleFactor.current);
        const newY = mousePosition.y - (mousePosition.y - app.stage.y) * (scaleFactor.current / oldScaleFactor.current);

        app.stage.scale.set(scaleFactor.current);
        app.stage.position.set(newX, newY);
      }

      e.preventDefault();
    };

    console.log(
      "check cam zoom event state",
      isEnvZoomEventDefined.current);

    if (!isEnvZoomEventDefined.current) {
      console.log("define on camera zoom event");
      canvas.addEventListener("wheel", zoomEvent);
      isEnvZoomEventDefined.current = true;
    }

    // if (!isCameraDragEventDefined.current) {
    //   const stage = app.stage;
    //
    //   stage.on("pointermove", e => {
    //     if (isDragging) {
    //       // onDrag()
    //     }
    //   });
    // }

    return () => {
      canvas.removeEventListener("wheel", zoomEvent);
      isEnvZoomEventDefined.current = false;
    };
  }, [a, app]);

  return (
    <pixiContainer
      anchor={0.5}
      eventMode={'static'}
      x={window.innerWidth / 2}
      y={window.innerHeight / 2}
    >

      {tiles}

      <RoomHoverTile
        position={hoverTilePosition}
        tileSize={TILE_SIZE}
      />
    </pixiContainer>
  );
};