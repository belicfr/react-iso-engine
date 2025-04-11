import {FC} from "react";
import Room from "../../../../models/Room.ts";
import {RoomView} from "../../RoomView.tsx";
import {RoomInfo} from "../../../gui/rooms/RoomInfo.tsx";
import {RoomPreferencesWindow} from "../../../gui/windows/prefabs/room-preferences/RoomPreferencesWindow.tsx";

type Props = {
  room: Room,

  isRoomPreferencesWindowOpened: boolean,

  onRoomPreferencesClose: () => void,
};

export const RoomViewContainer: FC<Props> = (
  {
    room,

    isRoomPreferencesWindowOpened,

    onRoomPreferencesClose,
  }
) => {
  return (
    <>
      <RoomView
        room={room}
      />

      <RoomInfo
        room={room}
      />

      {isRoomPreferencesWindowOpened &&
          <RoomPreferencesWindow
              room={room}

              onClose={onRoomPreferencesClose}
          />}
    </>
  );
};