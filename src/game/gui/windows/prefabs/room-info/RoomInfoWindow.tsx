import {FC} from "react";
import Room from "../../../../../models/Room.ts";
import {Window} from "../../Window.tsx";
import "./RoomInfoWindow.css";

type Props = {
  room: Room,

  onClose: () => void,
};

export const RoomInfoWindow: FC<Props> = ({room, onClose}) => {
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
                {room.owner.name}
              </p>
            </div>
          </div>

          <div className="room-info__tags">
            {room.tags.map(tag =>
              <span className="tag">{tag}</span>)}
          </div>

          <p className="room-info__description">
            {room.description}
          </p>
        </div>
      </Window>
    </>
  );
};