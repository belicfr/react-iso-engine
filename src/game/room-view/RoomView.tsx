import {FC} from "react";
import "./RoomView.css";
import {Application as GameEnvironment, extend} from "@pixi/react";
import {Container, Graphics, Sprite} from 'pixi.js';
import {GridSize, RoomFloor} from "./components/RoomFloor.tsx";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = object;

export const RoomView: FC<Props> = () => {
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
    </GameEnvironment>
  );
};
