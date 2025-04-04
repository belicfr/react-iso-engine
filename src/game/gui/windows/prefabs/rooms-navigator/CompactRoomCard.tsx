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
        <div className="room-intro">
          <div className={
            "players-in-room"
            + ` players-${props.room.getPopulationLevel()}`
          }>
            <div className="players-icon"></div>
            {props.room.playersCount}
          </div>

          <p className="room-name">
            {props.room.name}
          </p>
        </div>

        <div className="room-info__button">
          <div className="room-info__icon"></div>
        </div>
      </div>
    </>
  );
};