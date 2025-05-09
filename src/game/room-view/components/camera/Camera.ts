import {FC, useEffect, useRef} from "react";
import {useApplication} from "@pixi/react";
import {Coord2D} from "../../engine/precepts/Coord2D.ts";
import {FederatedPointerEvent} from "pixi.js";
import {Action} from "../../../../frameworks/utilities/Actions.ts";

type Props = {
  onCameraStartMove: Action,
  onCameraStopMove: Action,
};

export const Camera: FC<Props> = ({onCameraStartMove, onCameraStopMove}) => {
  const {app} = useApplication();

  const isDragging = useRef<boolean>(false);

  const dragStart = useRef<Coord2D>({x: 0, y: 0});
  const stageStart = useRef<Coord2D>({x: 0, y: 0});

  useEffect(() => {
    if (!app || !app.stage) return;

    const stage = app.stage;

    const onPointerDown = (e: FederatedPointerEvent) => {
      isDragging.current = true;
      dragStart.current = {x: e.globalX, y: e.globalY};
      stageStart.current = {x: stage.x, y: stage.y};
    };

    const onPointerMove = (e: FederatedPointerEvent) => {
      if (!isDragging.current) return;

      const delta: Coord2D = {
        x: e.globalX - dragStart.current.x,
        y: e.globalY - dragStart.current.y,
      };

      stage.x = stageStart.current.x + delta.x;
      stage.y = stageStart.current.y + delta.y;

      onCameraStartMove();
    };

    const onPointerUp = () => {
      isDragging.current = false;
      onCameraStopMove();
    };

    stage.eventMode = "static";
    stage
      .on("pointerdown", onPointerDown)
      .on("pointermove", onPointerMove)
      .on("pointerup", onPointerUp)
      .on("pointerupoutside", onPointerUp);

    return () => {
      stage
        .off("pointerdown", onPointerDown)
        .off("pointermove", onPointerMove)
        .off("pointerup", onPointerUp)
        .off("pointerupoutside", onPointerUp);
    };
  }, [app]);

  return null;
};