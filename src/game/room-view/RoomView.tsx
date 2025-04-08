import {FC, useRef} from "react";
import "./RoomView.css";
import {Application as GameEnvironment, extend} from "@pixi/react";
import {Container, Graphics, Sprite} from 'pixi.js';
import {RoomFloor} from "./components/RoomFloor.tsx";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = object;

export const RoomView: FC<Props> = props => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <GameEnvironment
      resizeTo={window}
      antialias={false}
      resolution={1}
    >

      <RoomFloor gridSize={{cols: 5, rows: 5}} />
    </GameEnvironment>
  );
};