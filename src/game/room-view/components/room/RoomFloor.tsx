import {FC, JSX, useEffect, useMemo, useRef, useState} from "react";
import {Size2D} from "../../engine/precepts/Size2D.ts";
import {extend, useApplication} from "@pixi/react";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";
import {RoomTile} from "./RoomTile.tsx";
import {Container, Graphics, Sprite} from "pixi.js";
import {RoomHoverTile} from "./RoomHoverTile.tsx";
import {PlayerAvatar} from "../player/PlayerAvatar.tsx";
import {TileSituation} from "../../../../models/RoomTemplate.ts";
import {UserAction} from "../../../../frameworks/types/Actions.ts";
import {PublicUserDto} from "../../../../models/dto/public/PublicUserDto.ts";
import {useUser} from "../../../../io/users/UserContext.tsx";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  players: PublicUserDto[],
  tilesPositions: TileSituation[],
  isCameraMoving: boolean,

  onPlayerFocus: UserAction,
};

export const RoomFloor: FC<Props> = ({players, tilesPositions, isCameraMoving, onPlayerFocus}) => {
  const a = useApplication();
  const {app} = a;

  const TILE_SIZE = useMemo<Size2D>(() => ({
    width: 72,
    height: 36,
  }), []);

  const user = useUser();

  const scaleFactor = useRef<number>(1);
  const oldScaleFactor = useRef<number>(1);

  const isEnvZoomEventDefined = useRef<boolean>(false);
  const isEntranceInitialized = useRef<boolean>(false);

  const [livePlayersList, setLivePlayersList] = useState<PublicUserDto[]>([]);

  const [ hoverTilePosition, setHoverTilePosition ] = useState<Coord2D>({x: 0, y: 0});

  const setPlayerPosition = (pos: Coord2D) => {
    // if (user.invisible) return;

    user.position = pos;

    setLivePlayersList(prevState => [
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

  const playersContainer = useMemo(() =>
    livePlayersList.map(player =>
      <PlayerAvatar
        key={Math.random().toPrecision(1)}
        x={player.position.x}
        y={player.position.y}
        z={2}
        user={player}

        onFocus={onPlayerFocus}
      />), [livePlayersList]);

  useEffect(() => {
    setLivePlayersList(players);
  }, [players]);

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

      {playersContainer}
    </pixiContainer>
  );
};