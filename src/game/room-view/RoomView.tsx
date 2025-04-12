import {FC} from "react";
import "./RoomView.css";
import {Application as GameEnvironment, extend} from "@pixi/react";
import {Container, Graphics, Sprite} from 'pixi.js';
import {RoomFloor} from "./components/room/RoomFloor.tsx";
import {Camera} from "./components/camera/Camera.ts";
import Room from "../../models/Room.ts";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  room: Room,
};

export const RoomView: FC<Props> = ({room}) => {
  return (
    <GameEnvironment
      resizeTo={window}
      antialias={true}
      resolution={1}
    >

      <RoomFloor
        tilesPositions={room.template.generate()}
      />

      <Camera />
    </GameEnvironment>
  );
};
