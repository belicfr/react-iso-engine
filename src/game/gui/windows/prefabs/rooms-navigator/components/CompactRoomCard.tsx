import {FC, useState} from "react";
import "./RoomCard.css";
import {RoomCardProps} from "./RoomsList.tsx";
import {RoomInfoWindow} from "../../room-info/RoomInfoWindow.tsx";

export const CompactRoomCard: FC<RoomCardProps> = ({room, onClick}) => {
  const [isRoomInfoWindowOpened, setIsRoomInfoWindowOpened] = useState<boolean>(false);

  function onRoomCardClick() {
    onClick(room);
    setIsRoomInfoWindowOpened(false);
  }

  function onRoomInfoButtonClick() {
    setIsRoomInfoWindowOpened(!isRoomInfoWindowOpened);
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
            + ` players-${room.getPopulationLevel()}`
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

      {isRoomInfoWindowOpened &&
          <RoomInfoWindow
            room={room}

            onClose={() => setIsRoomInfoWindowOpened(false)}
          />}
    </>
  );
};