import {FC, useEffect, useRef, useState} from "react";
import Room from "../../../models/Room.ts";
import "./RoomInfo.css";
import gsap from "gsap";
import {PublicRoomDto} from "../../../models/dto/public/PublicRoomDto.ts";
import {PublicUserDto} from "../../../models/dto/public/PublicUserDto.ts";
import {getPlayerById} from "../../../io/rooms/RoomsIO.ts";

type Props = {
  room: PublicRoomDto,
};

export const RoomInfo: FC<Props> = ({room}) => {
  const roomInfo = useRef<HTMLDivElement>(null);
  const [ owner, setOwner ] = useState<PublicUserDto|null>(null);

  const isOwnerLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (!isOwnerLoaded.current) {
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
            userName: owner.userName,
            normalizedUserName: owner.normalizedUserName,
          });

          isOwnerLoaded.current = true;
        })
        .catch(err => console.error(err));
    }
  }, [room]);

  useEffect(() => {
    if (!roomInfo.current) return;

    const tl = gsap.timeline({paused: false});

    tl
      .set(roomInfo.current, {
        y: "100%",
        opacity: 0,
      })
      .to(roomInfo.current, {
        duration: 2,
        delay: 0,

        y: 0,
        opacity: 1,

        ease: "Power2.easeInOut",
      })
      .to(roomInfo.current, {
        duration: 1,
        delay: 2,

        y: "-100%",
        opacity: 0,

        ease: "Power2.easeInOut",
      })
      .play();

    return () => {
      tl.kill();
    };
  }, [room, isOwnerLoaded]);

  return (
    <>
      <div
        className="room-info"
        ref={roomInfo}
      >

        <h4 className="room-info__name">
          {room.name}
        </h4>

        {owner &&
            <p className="room-info__owner-name">
              {room.isPublic
                ? Room.PUBLIC_ROOM
                : owner.userName}
            </p>}
      </div>
    </>
  );
};