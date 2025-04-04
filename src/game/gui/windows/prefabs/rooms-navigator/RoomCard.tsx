import {FC} from "react";
import Room from "../../../../../models/Room.ts";
import "./RoomCard.css";

type Props = {
  room: Room,
};

export const RoomCard: FC<Props> = props => {
  return (
    <>
      <div className="room-card">
        <p className="room-name">
          {props.room.name}
        </p>
      </div>
    </>
  );
};