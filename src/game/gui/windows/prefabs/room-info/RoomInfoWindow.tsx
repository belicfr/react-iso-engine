import {FC, useEffect, useRef, useState} from "react";
import Room from "../../../../../models/Room.ts";
import {Window} from "../../Window.tsx";
import "./RoomInfoWindow.css";
import {Action} from "../../../../../frameworks/types/Actions.ts";
import {PublicRoomDto} from "../../../../../models/dto/public/PublicRoomDto.ts";
import {PublicUserDto} from "../../../../../models/dto/public/PublicUserDto.ts";
import {getPlayerById} from "../../../../../io/rooms/RoomsIO.ts";

type Props = {
  room: PublicRoomDto,

  onClose: Action,
};

export const RoomInfoWindow: FC<Props> = ({room, onClose}) => {
  const [ owner, setOwner ] = useState<PublicUserDto|null>(null);

  const isOwnerLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (isOwnerLoaded.current) return;

    getPlayerById(room.ownerId)
      .then(response => {
        if (!response.ok) {
          throw new Error("Room owner retrieving failed");
        }

        return response.json();
      })
      .then(owner => {
        setOwner({
          id: owner.id,
          name: owner.userName,
          normalizedName: owner.normalizedUserName,
        });

        isOwnerLoaded.current = true;
      })
      .catch(err => console.error(err));
  }, [room]);

  if (!owner) return;

  return (
    <>
      <Window
        customHeaderClassName="room-info-window"
        dragHandleClassName="room-info-window"
        title={`Room Info: ${room.name}`}
        width="400px"
        height="300px"
        onClose={onClose}
      >

        <div className="room-info__container">
          <div className="room-info__intro">
            <div className="room-info__picture"></div>

            <div className="room-info__information">
              <h6 className="room-info__name">
                {room.name}
              </h6>

              <p className="room-info__owner-name">
                {room.isPublic
                  ? Room.PUBLIC_ROOM
                  : owner.name}
              </p>
            </div>
          </div>

          <div className="room-info__tags">
            {room.tagOne?.length &&
              <span className="tag">{room.tagOne}</span>}

            {room.tagTwo?.length &&
              <span className="tag">{room.tagTwo}</span>}
          </div>

          <p className="room-info__description">
            {room.description}
          </p>
        </div>
      </Window>
    </>
  );
};