import {FC, useEffect, useRef, useState} from "react";
import Room from "../../../../models/Room.ts";
import "./RoomInfo.css";
import gsap from "gsap";

type Props = {
  room: Room,
};

export const RoomInfo: FC<Props> = ({room}) => {
  const roomInfo = useRef<HTMLDivElement>(null);

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
  }, [room]);

  return (
    <>
      <div
        className="room-info"
        ref={roomInfo}
      >

        <h4 className="room-info__name">
          {room.name}
        </h4>

        <p className="room-info__owner-name">
          {room.owner.name}
        </p>
      </div>
    </>
  );
};