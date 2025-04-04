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
};

export const RoomsList: FC<Props> = props => {
  const renderRoomCard = (room: Room) => {
    switch (props.visibility) {
      case RoomsListVisibility.COMPACT_LIST:
        return <CompactRoomCard room={room} />;

      case RoomsListVisibility.LIST:
        return <RoomCard room={room} />;

      default:
        return <>ERROR</>;
    }
  };

  return (
    <>
      <div className="rooms-list">
        {props.rooms.map(room => renderRoomCard(room))}
      </div>
    </>
  );
};