import {FC} from "react";
import Room from "../../../../models/Room.ts";
import {RoomView} from "../../RoomView.tsx";
import {RoomInfo} from "../../../gui/rooms/RoomInfo.tsx";
import {RoomPreferencesWindow} from "../../../gui/windows/prefabs/room-preferences/RoomPreferencesWindow.tsx";
import User from "../../../../models/User.ts";
import {Action, UserAction} from "../../../../frameworks/utilities/Actions.ts";

type Props = {
  room: Room,
  players: User[],

  isRoomPreferencesWindowOpened: boolean,

  onRoomPreferencesClose: Action,
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