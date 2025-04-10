import {FC} from "react";
import "./RoomCard.css";
import {RoomCardProps} from "./RoomsList.tsx";

export const CompactRoomCard: FC<RoomCardProps> = ({room, onClick}) => {
  return (
    <>
      <div
        className="compact-room-card"

        onClick={() => onClick(room)}
      >

        <div className="room-intro">
          <div className={
            "players-in-room"
            + ` players-${room.getPopulationLevel()}`
          }>
            <div className="players-icon"></div>
            {room.playersCount}
          </div>

          <p className="room-name">
            {room.name}
          </p>
        </div>

        <div className="room-info__button">
          <div className="room-info__icon"></div>
        </div>
      </div>
    </>
  );
};