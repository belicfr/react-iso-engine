import {FC, useState} from "react";
import "./RoomView.css";
import {Application as GameEnvironment, extend} from "@pixi/react";
import {Container, Graphics, Sprite} from 'pixi.js';
import {RoomFloor} from "./components/room/RoomFloor.tsx";
import {Camera} from "./components/camera/Camera.ts";
import User from "../../models/User.ts";
import {UserAction} from "../../frameworks/types/Actions.ts";
import RoomTemplate from "../../models/RoomTemplate.ts";
import {PublicRoomDto} from "../../models/dto/public/PublicRoomDto.ts";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  room: PublicRoomDto,
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
        tilesPositions={RoomTemplate.generate(room.template)}
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
