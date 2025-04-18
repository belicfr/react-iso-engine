import {FC, JSX, useEffect, useMemo, useRef, useState} from "react";
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {extend, useApplication} from "@pixi/react";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";
import {RoomTile} from "./RoomTile.tsx";
import {Container, Graphics, Sprite} from "pixi.js";
import {RoomHoverTile} from "./RoomHoverTile.tsx";
import {PlayerAvatar} from "../player/PlayerAvatar.tsx";
import {TileSituation} from "../../../../models/RoomTemplate.ts";
import User, {SessionRepository} from "../../../../models/User.ts";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  tilesPositions: TileSituation[],
  isCameraMoving: boolean,
};

export const  RoomFloor: FC<Props> = ({tilesPositions, isCameraMoving}) => {
  const a = useApplication();
  const {app} = a;

  const user = SessionRepository.i().user;
  
  const TILE_SIZE = useMemo<Size2D>(() => ({
    width: 72,
    height: 36,
  }), []);

  const scaleFactor = useRef<number>(1);
  const oldScaleFactor = useRef<number>(1);

  const isEnvZoomEventDefined = useRef<boolean>(false);
  const isEntranceInitialized = useRef<boolean>(false);

  const [ playersInRoom, setPlayersInRoom ] = useState<User[]>([user]);

  const [ hoverTilePosition, setHoverTilePosition ] = useState<Coord2D>({x: 0, y: 0});

  const setPlayerPosition = (pos: Coord2D) => {
    user.currentPosition = pos;
    setPlayersInRoom(prevState => [
      ...prevState.filter(u => u.id !== user.id),
      user,
    ]);
  };

  const tiles = useMemo(() => {
    const tiles: JSX.Element[] = [];

    tilesPositions.forEach(tilePos => {
      const isoX = (tilePos.x - tilePos.y) * (TILE_SIZE.width / 2);
      const isoY = (tilePos.x + tilePos.y) * (TILE_SIZE.height / 2);

      if (!isEntranceInitialized.current && tilePos.isEntrance) {
        setPlayerPosition({x: isoX, y: isoY});
        isEntranceInitialized.current = true;
      }

      tiles.push((
        <RoomTile
          key={`${tilePos.x},${tilePos.y}`}
          position={{x: isoX, y: isoY}}
          tileSize={TILE_SIZE}

          onHoverTile={(pos: Coord2D) => {
            setHoverTilePosition(pos);
          }}
        />
      ));
    });

    return tiles;
  }, [tilesPositions, TILE_SIZE]);

  useEffect(() => {
    if (!app || !app.renderer || !app.canvas) return;

    const canvas: HTMLCanvasElement = app.canvas;

    const zoomEvent = (e: WheelEvent) => {
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

    if (!isEnvZoomEventDefined.current) {
      canvas.addEventListener("wheel", zoomEvent);
      isEnvZoomEventDefined.current = true;
    }

    return () => {
      canvas.removeEventListener("wheel", zoomEvent);
      isEnvZoomEventDefined.current = false;
    };
  }, [a, app]);

  return (
    <pixiContainer
      anchor={0}
      eventMode={'static'}
      x={window.innerWidth / 2}
      y={window.innerHeight / 2}
      sortableChildren={true}
    >

      {tiles}

      <RoomHoverTile
        position={hoverTilePosition}
        tileSize={{width: 72, height: 36}}
        z={1}

        onClick={pos => {
          if (!isCameraMoving) {
            setPlayerPosition(pos);
          }
        }}
      />

      {playersInRoom.map((player: User) =>
        <PlayerAvatar
          key={player.id}
          x={player.currentPosition.x}
          y={player.currentPosition.y}
          z={2}
          user={player}
        />)}
    </pixiContainer>
  );
};