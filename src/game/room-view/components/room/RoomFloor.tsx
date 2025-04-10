import {FC, ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {extend, useApplication} from "@pixi/react";
import ScreenIso from "../../engine/precepts/ScreenIso.ts";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";
import {RoomTile} from "./RoomTile.tsx";
import {Container, Graphics, Sprite} from "pixi.js";
import {RoomHoverTile} from "./RoomHoverTile.tsx";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  gridSize: GridSize,
};

export const RoomFloor: FC<Props> = ({gridSize}) => {
  const a = useApplication();
  const {app} = a;
  
  const TILE_SIZE = useMemo<Size2D>(() => ({
    width: 72,
    height: 36,
  }), []);

  const scaleFactor = useRef<number>(1);
  const oldScaleFactor = useRef<number>(1);

  const isEnvZoomEventDefined = useRef<boolean>(false);
  const isCameraDragEventDefined = useRef<boolean>(false);

  const isDragging = useRef<boolean>(false);

  const [hoverTilePosition, setHoverTilePosition] = useState<Coord2D>({x: 0, y: 0});

  const tiles = useMemo(() => {
    const tiles = [];

    function updateHoverTile(gridPos: Coord2D) {
      if (!hoverTile.current) {
        return;
      }

      gridPos.x = Math.max(0, Math.min(gridSize.cols - 1, gridPos.x));
      gridPos.y = Math.max(0, Math.min(gridSize.rows - 1, gridPos.y));

      const {isoX, isoY} = ScreenIso.isoToScreen(
        {x: gridPos.x, y: gridPos.y}, TILE_SIZE);

      hoverTile.current.x = isoX;
      hoverTile.current.y = isoY;
      hoverTile.current.zIndex = gridPos.y + gridPos.x;
    }

    for (let y = 0; y < gridSize.rows; y++) {
      for (let x = 0; x < gridSize.cols; x++) {
        const isoX = (x - y) * (TILE_SIZE.width / 2);
        const isoY = (x + y) * (TILE_SIZE.height / 2);

        tiles.push((
          <RoomTile
            key={`${x},${y}`}
            position={{x: isoX, y: isoY}}
            gridPos={{x, y}}
            tileSize={TILE_SIZE}


            onHoverTile={(pos: Coord2D) => {
              console.log(pos);
              setHoverTilePosition(pos);
            }}
          />
        ));
      }
    }

    return tiles;
  }, [gridSize.rows, gridSize.cols, TILE_SIZE]);

  const hoverTile = useRef<HoverTileSituation>(null);

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

export type GridSize = {
  cols: number,
  rows: number,
};

type HoverTileSituation = Coord2D & {
  zIndex: number,
};

export type TileSituation = {
  gridX: number, gridY: number,
  sprite: ReactNode,
};