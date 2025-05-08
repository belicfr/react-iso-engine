import {FC} from "react";
import Room from "../../../../models/Room.ts";
import {RoomView} from "../../RoomView.tsx";
import {RoomInfo} from "../../../gui/rooms/RoomInfo.tsx";
import {RoomPreferencesWindow} from "../../../gui/windows/prefabs/room-preferences/RoomPreferencesWindow.tsx";
import User, {UserAction} from "../../../../models/User.ts";

type Props = {
  room: Room,
  players: User[],

  isRoomPreferencesWindowOpened: boolean,

  onRoomPreferencesClose: () => void,
  onPlayerFocus: UserAction,
};

export const RoomViewContainer: FC<Props> = (
  {
    room,
    players,

    isRoomPreferencesWindowOpened,

    onRoomPreferencesClose,
    onPlayerFocus,
  }
) => {
  return (
    <>
      <RoomView
        room={room}
        players={players}

        onPlayerFocus={onPlayerFocus}
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