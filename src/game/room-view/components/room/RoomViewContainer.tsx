import {FC} from "react";
import Room from "../../../../models/Room.ts";
import {RoomView} from "../../RoomView.tsx";
import {RoomInfo} from "./RoomInfo.tsx";

type Props = {
  room: Room,
};

export const RoomViewContainer: FC<Props> = ({room}) => {
  return (
    <>
      <RoomView
        room={room}
      />

      <RoomInfo
        room={room}
      />
    </>
  );
};