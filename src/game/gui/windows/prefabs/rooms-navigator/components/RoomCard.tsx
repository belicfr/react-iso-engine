import {FC} from "react";
import "./RoomCard.css";
import {RoomCardProps} from "./RoomsList.tsx";

export const RoomCard: FC<RoomCardProps> = ({room, onClick}) => {
  return (
    <>
      <div
        className="room-card"

        onClick={() => onClick(room)}
      >

        <p className="room-name">
          {room.name}
        </p>
      </div>
    </>
  );
};