import {FC} from "react";
import "./RoomCard.css";
import {RoomCardProps} from "./RoomsList.tsx";
import Room from "../../../../../../models/Room.ts";

export const CompactRoomCard: FC<RoomCardProps> = ({room, onInfoClick, onClick}) => {
  function onRoomCardClick() {
    onClick(room);
  }

  function onRoomInfoButtonClick() {
    onInfoClick(room);
  }

  return (
    <>
      <div className="compact-room-card">
        <div
          className="room-intro"
          onClick={onRoomCardClick}
        >

          <div className={
            "players-in-room"
            + ` players-${Room.getPopulationLevel(room.playersInRoomCount, room.playersLimit)}`
          }>

            <div className="players-icon"></div>
            {room.playersInRoomCount}
          </div>

          <p className="room-name">
            {room.name}
          </p>
        </div>

        <div
          className="room-info__button"

          onClick={onRoomInfoButtonClick}
        >

          <div className="room-info__icon"></div>
        </div>
      </div>
    </>
  );
};