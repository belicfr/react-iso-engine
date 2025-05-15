import {FC} from "react";
import {CompactRoomCard} from "./CompactRoomCard.tsx";
import {RoomCard} from "./RoomCard.tsx";
import "./RoomsList.css";
import {RoomAction} from "../../../../../../frameworks/types/Actions.ts";
import {PublicRoomDto} from "../../../../../../models/dto/public/PublicRoomDto.ts";

export enum RoomsListVisibility {
  COMPACT_LIST,
  LIST,
}

type Props = {
  rooms: PublicRoomDto[],
  visibility: RoomsListVisibility,

  onRoomInfoClick: RoomAction,
  onRoomClick: RoomAction,
};

export const RoomsList: FC<Props> = ({rooms, visibility, onRoomInfoClick, onRoomClick}) => {
  const renderRoomCard = (room: PublicRoomDto, index: number) => {
    switch (visibility) {
      case RoomsListVisibility.COMPACT_LIST:
        return (
          <CompactRoomCard
            key={index}
            room={room}

            onInfoClick={onRoomInfoClick}
            onClick={onRoomClick}
          />
        );

      case RoomsListVisibility.LIST:
        return (
          <RoomCard
            key={index}
            room={room}

            onInfoClick={onRoomInfoClick}
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
  room: PublicRoomDto,

  onInfoClick: RoomAction,
  onClick: RoomAction,
};