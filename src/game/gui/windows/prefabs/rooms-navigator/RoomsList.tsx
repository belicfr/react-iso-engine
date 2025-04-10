import {FC} from "react";
import Room from "../../../../../models/Room.ts";
import {CompactRoomCard} from "./CompactRoomCard.tsx";
import {RoomCard} from "./RoomCard.tsx";
import "./RoomsList.css";

export enum RoomsListVisibility {
  COMPACT_LIST,
  LIST,
}

type Props = {
  rooms: Room[],
  visibility: RoomsListVisibility,

  onRoomClick: (room: Room) => void,
};

export const RoomsList: FC<Props> = ({rooms, visibility, onRoomClick}) => {
  const renderRoomCard = (room: Room, index: number) => {
    switch (visibility) {
      case RoomsListVisibility.COMPACT_LIST:
        return (
          <CompactRoomCard
            key={index}
            room={room}

            onClick={onRoomClick}
          />
        );

      case RoomsListVisibility.LIST:
        return (
          <RoomCard
            key={index}
            room={room}

            onClick={onRoomClick}
          />
        );

      default:
        return <>ERROR</>;
    }
  };

  return (
    <>
      <div className="rooms-list">
        {rooms.map((room, index) =>
          renderRoomCard(room, index))}
      </div>
    </>
  );
};

export type RoomCardProps = {
  room: Room,

  onClick: (room: Room) => void,
};