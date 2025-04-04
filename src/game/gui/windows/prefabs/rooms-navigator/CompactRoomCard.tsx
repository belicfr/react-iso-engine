import {FC} from "react";
import Room from "../../../../../models/Room.ts";
import "./RoomCard.css";

type Props = {
  room: Room,
};

export const CompactRoomCard: FC<Props> = props => {
  return (
    <>
      <div className="compact-room-card">
        <p className="room-name">
          {props.room.name}
        </p>

        <div className="room-info__button">
          <div className="room-info__icon"></div>
        </div>
      </div>
    </>
  );
};