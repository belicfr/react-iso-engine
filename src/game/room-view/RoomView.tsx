import {FC, useState} from "react";
import "./RoomView.css";
import {Application as GameEnvironment, extend} from "@pixi/react";
import {Container, Graphics, Sprite} from 'pixi.js';
import {RoomFloor} from "./components/room/RoomFloor.tsx";
import {Camera} from "./components/camera/Camera.ts";
import Room from "../../models/Room.ts";
import User, {UserAction} from "../../models/User.ts";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  room: Room,
  players: User[],

  onPlayerFocus: UserAction,
};

export const RoomView: FC<Props> = ({room, players, onPlayerFocus}) => {
  const [ isCameraMoving, setIsCameraMoving ] = useState<boolean>(false);

  return (
    <GameEnvironment
      resizeTo={window}
      antialias={true}
      resolution={1}
    >

      <RoomFloor
        players={players}
        tilesPositions={room.template.generate()}
        isCameraMoving={isCameraMoving}

        onPlayerFocus={onPlayerFocus}
      />

      <Camera
        onCameraStartMove={() => setIsCameraMoving(true)}
        onCameraStopMove={() => setIsCameraMoving(false)}
      />
    </GameEnvironment>
  );
};
