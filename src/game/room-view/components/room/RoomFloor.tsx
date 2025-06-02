import {FC, useEffect, useMemo, useRef, useState} from "react";
import {extend, useApplication} from "@pixi/react";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";
import {Container, Graphics, Sprite, Texture} from "pixi.js";
import {RoomHoverTile} from "./RoomHoverTile.tsx";
import {PlayerAvatar} from "../player/PlayerAvatar.tsx";
import {TileSituation} from "../../../../models/RoomTemplate.ts";
import {UserAction} from "../../../../frameworks/types/Actions.ts";
import {PublicUserDto} from "../../../../models/dto/public/PublicUserDto.ts";
import {useUser} from "../../../../io/users/UserContext.tsx";
import {buildRoomScene, SpriteRegistry} from "../../../../../../iso-engine/src/scene/buildRoomScene.ts";
import {TILE_SIZE} from "../../../../../../iso-engine/src/utils/Iso.ts";

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

  const gameContainer = useRef<Container>(new Container());

  const user = useUser();

  const scaleFactor = useRef<number>(1);
  const oldScaleFactor = useRef<number>(1);

  const isEnvZoomEventDefined = useRef<boolean>(false);
  const isEntranceInitialized = useRef<boolean>(false);

  const [ registry, setRegistry ] = useState<SpriteRegistry|null>(null);

  const [livePlayersList, setLivePlayersList] = useState<PublicUserDto[]>([]);

  const [ hoverTilePosition, setHoverTilePosition ] = useState<Coord2D>({x: 0, y: 0});
  const [ isHoverTileVisible, setIsHoverTileVisible ] = useState<boolean>(false);

  const isHoverHandlersInitialized = useRef<boolean>(false);

  const setPlayerPosition = (pos: Coord2D) => {
    // if (user.invisible) return;

    user.position = pos;

    setLivePlayersList(prevState => [
      ...prevState.filter(u => u.id !== user.id),
      user,
    ]);
  };

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

  useEffect(() => {
    const init = async () => {
      setRegistry(await buildRoomScene(
        gameContainer.current,
        {
          tilesPositions,
        },
        {
          assetsUrl: "/src/assets",
        }));

      isHoverHandlersInitialized.current = false;
    };

    init();
  }, [tilesPositions]);

  useEffect(() => {
    if (!registry || isHoverHandlersInitialized.current) return;

    Object.values(registry.tiles).forEach(tile => {
      tile.eventMode = "static";

      tile.on("pointerover", () => {
        setIsHoverTileVisible(true);
        setHoverTilePosition({
          x: tile.x,
          y: tile.y,
        });
      });

      tile.on("pointerout", () => {
        setIsHoverTileVisible(false);
      });
    });

    isHoverHandlersInitialized.current = true;
  }, [registry]);

  return (
    <pixiContainer
      ref={gameContainer}
      anchor={0}
      eventMode={'static'}
      x={window.innerWidth / 2}
      y={window.innerHeight / 2}
      sortableChildren={true}
    >

      <RoomHoverTile
        position={hoverTilePosition}
        tileSize={TILE_SIZE}
        z={2}
        visible={isHoverTileVisible}

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