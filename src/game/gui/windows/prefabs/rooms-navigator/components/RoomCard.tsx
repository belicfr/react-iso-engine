import {FC, MouseEventHandler} from "react";
import "./RoomCard.css";
import {RoomCardProps} from "./RoomsList.tsx";
import Room from "../../../../../../models/Room.ts";

export const RoomCard: FC<RoomCardProps> = ({room, onInfoClick, onClick}) => {
  function onRoomCardClick() {
    onClick(room);
  }

  function onRoomInfoButtonClick(event: MouseEvent) {
    event.stopPropagation();

    onInfoClick(room);
  }

  return (
    <>
      <div
        className="room-card"

        onClick={onRoomCardClick}
      >

        <div
          className="room-thumbnail"
          style={{backgroundImage: `url("${room.thumbnail}")`}}
        >

          <div
            className="room-info__button"

            onClick={onRoomInfoButtonClick}
          >

            <div className="room-info__icon"></div>
          </div>

          <div className={
            "players-in-room"
            + ` players-${Room.getPopulationLevel(room.playersInRoomCount, room.playersLimit)}`
          }>

            <div className="players-icon"></div>
            {room.playersInRoomCount}
          </div>
        </div>

        <p className="room-name">
          {room.name}
        </p>
      </div>
    </>
  );
};