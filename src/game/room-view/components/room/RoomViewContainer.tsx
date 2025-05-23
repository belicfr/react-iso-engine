import {FC} from "react";
import {RoomView} from "../../RoomView.tsx";
import {RoomInfo} from "../../../gui/rooms/RoomInfo.tsx";
import {RoomPreferencesWindow} from "../../../gui/windows/prefabs/room-preferences/RoomPreferencesWindow.tsx";
import {Action, RoomAction, UserAction} from "../../../../frameworks/types/Actions.ts";
import {PublicRoomDto} from "../../../../models/dto/public/PublicRoomDto.ts";
import {PublicUserDto} from "../../../../models/dto/public/PublicUserDto.ts";

type Props = {
  room: PublicRoomDto,
  players: PublicUserDto[],

  canManageRoom: boolean,

  isRoomPreferencesWindowOpened: boolean,

  onRoomPreferencesClose: Action,
  onPlayerFocus: UserAction,
  onRoomUpdate: RoomAction,
};

export const RoomViewContainer: FC<Props> = (
  {
    room,
    players,

    canManageRoom,

    isRoomPreferencesWindowOpened,

    onRoomPreferencesClose,
    onPlayerFocus,
    onRoomUpdate,
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

      {canManageRoom && isRoomPreferencesWindowOpened &&
          <RoomPreferencesWindow
              room={room}

              onRoomUpdate={onRoomUpdate}
              onClose={onRoomPreferencesClose}
          />}
    </>
  );
};