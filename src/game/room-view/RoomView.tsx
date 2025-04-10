import {FC} from "react";
import "./RoomView.css";
import {Application as GameEnvironment, extend} from "@pixi/react";
import {Container, Graphics, Sprite} from 'pixi.js';
import {GridSize, RoomFloor} from "./components/room/RoomFloor.tsx";
import {Camera} from "./components/camera/Camera.ts";

extend({
  Container,
  Graphics,
  Sprite,
});

export const RoomView: FC = () => {
  const gridSize: GridSize = {cols: 5, rows: 5};

  return (
    <GameEnvironment
      resizeTo={window}
      antialias={true}
      resolution={1}
    >

      <RoomFloor
        gridSize={gridSize}
      />

      <Camera />
    </GameEnvironment>
  );
};
