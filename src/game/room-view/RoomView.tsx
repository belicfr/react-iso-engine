import {FC, useRef, useState} from "react";
import "./RoomView.css";
import {Application as GameEnvironment, extend} from "@pixi/react";
import {Container, Graphics, Sprite} from 'pixi.js';
import {RoomFloor} from "./components/room/RoomFloor.tsx";
import {Camera} from "./components/camera/Camera.ts";
import {UserAction} from "../../frameworks/types/Actions.ts";
import RoomTemplate from "../../models/RoomTemplate.ts";
import {PublicUserDto} from "../../models/dto/public/PublicUserDto.ts";
import {PublicRenderRoomDto} from "../../models/dto/public/PublicRenderRoomDto.ts";

extend({
  Container,
  Graphics,
  Sprite,
});

type Props = {
  room: PublicRenderRoomDto,
  players: PublicUserDto[],

  onPlayerFocus: UserAction,
};

export const RoomView: FC<Props> = ({room, players, onPlayerFocus}) => {
  const isCameraMoving = useRef<boolean>(false);
  const hasCameraMoved = useRef<boolean>(false);

  console.log(room.template);

  return (
    <GameEnvironment
      resizeTo={window}
      antialias={true}
      resolution={1}
      autoDensity={true}
    >

      <RoomFloor
        room={room}
        players={players}
        tilesPositions={RoomTemplate.generate(room.template)}

        isCameraMoving={isCameraMoving}
        hasCameraMoved={hasCameraMoved}

        onPlayerFocus={onPlayerFocus}
      />

      <Camera
        onCameraPointerDown={() => hasCameraMoved.current = false}
        onCameraStartMove={() => {
          hasCameraMoved.current = true;
          isCameraMoving.current = true;
        }}
        onCameraStopMove={() => isCameraMoving.current = false}
      />
    </GameEnvironment>
  );
};
