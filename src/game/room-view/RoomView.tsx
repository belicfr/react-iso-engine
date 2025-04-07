import {FC, useEffect, useRef, useState} from "react";
import "./RoomView.css";
import Game from "./engine/Game.ts";
import GameRoom from "./engine/GameRoom.ts";
import {Coord2D} from "./engine/precepts/Coord2D.ts";
import Furni from "./entities/Furni.ts";
import GameAssets from "./engine/GameAssets.ts";

type Props = {
  app: Game,
};

export const RoomView: FC<Props> = ({app}) => {
  const container = useRef<HTMLDivElement>(null);

  const isClientPrepared = useRef<boolean>(false);

  const scaleFactor = useRef<number>(1);
  const oldScaleFactor = useRef<number>(1);

  const [ canvas, setCanvas ]
    = useState<HTMLCanvasElement|undefined>(app.app.canvas);

  useEffect(() => {
    async function prepareClient() {
      console.log("Preparing client...");
      const room: GameRoom = new GameRoom({
        gridSize: {rows: 10, cols: 10},
        tileSize: {width: 72, height: 36},
      });

      let isDragging: boolean = false;
      let hasMoved: boolean = false;
      let dragStart: Coord2D = { x: 0, y: 0 };
      let stageStart: Coord2D = { x: 0, y: 0 };

      let isFurnisLoaded: boolean = false;
      let selectedFurni: Furni;

      await GameAssets.loadTiles();

      /*
      FIXME: [room.grid=UNDEFINED].width
          -> return to hotel view, then return to room
       */
      console.log("room", app.app, app.app.renderer, Object.keys(app.app));
      app.app.stage.x = (app.app.renderer.width / 2) - (room.grid.width / 4);
      app.app.stage.y = (app.app.renderer.height / 2) - (room.grid.height / 2);

      const hoverTile = room.createHoverTile();
      app.addChild(hoverTile.sprite);

      room.createTerrain();
      room.tiles.forEach(tile => app.addChild(tile.sprite));

      app.app.stage.eventMode = 'static';
      app.app.stage.interactiveChildren = true;

      /*
       *    ZOOM +/-
       * using mouse scroll wheel
       */
      app.app.canvas.addEventListener('wheel', (event) => {
        const zoomSpeed = 0.1;
        const scrollThreshold = 5;

        if (Math.abs(event.deltaY) > scrollThreshold) {
          oldScaleFactor.current = scaleFactor.current;

          if (event.deltaY < 0) {
            scaleFactor.current += zoomSpeed;
          } else {
            scaleFactor.current -= zoomSpeed;
          }

          scaleFactor.current = Math.max(0.5, Math.min(5, scaleFactor.current));

          const mousePosition = app.app.renderer.events.pointer.global;

          const newX = mousePosition.x - (mousePosition.x - app.app.stage.x) * (scaleFactor.current / oldScaleFactor.current);
          const newY = mousePosition.y - (mousePosition.y - app.app.stage.y) * (scaleFactor.current / oldScaleFactor.current);

          app.app.stage.scale.set(scaleFactor.current);
          app.app.stage.position.set(newX, newY);
        }
        event.preventDefault();
      });

      /*
          TODO:
            - camera move
            - click actions
       */
    }

    if (!isClientPrepared.current) {
      prepareClient();
      isClientPrepared.current = true;
    }
  }, [app, canvas]);

  useEffect(() => {
    if (container.current && canvas) {
      container.current.appendChild(canvas);
    }
  }, [canvas]);

  return (
    <>
      <div
        className="room-view__container"
        ref={container}
      ></div>
    </>
  );
};