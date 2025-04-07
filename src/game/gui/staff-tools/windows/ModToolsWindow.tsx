import {FC, useEffect, useState} from "react";
import {Window} from "../../windows/Window.tsx";
import {Button} from "../../buttons/Button.tsx";
import "./ModToolsWindow.css";
import {RoomToolsWindow} from "./RoomToolsWindow.tsx";
import {RoomChatlogsWindow} from "./RoomChatlogsWindow.tsx";
import {UserInfoWindow} from "./UserInfoWindow.tsx";
import {TicketsBrowserWindow} from "./TicketsBrowserWindow.tsx";
import User from "../../../../models/User.ts";
import Room from "../../../../models/Room.ts";

type Props = {
  currentRoom: Room,
  focusedUser: User,

  onClose: () => void,
};

type Action = {
  label: string,
  onClick: () => void,
  disabled?: boolean,
}

export const ModToolsWindow: FC<Props> = props => {
  const [ isRoomToolsOpened, setIsRoomToolsOpened ] = useState(false);
  const [ isRoomChatlogsOpened, setIsRoomChatlogsOpened ] = useState(false);
  const [ isUserInfoOpened, setIsUserInfoOpened ] = useState(false);
  const [ isTicketsBrowserOpened, setIsTicketsBrowserOpened ] = useState(false);

  const toggleRoomTools = () => setIsRoomToolsOpened(!isRoomToolsOpened);
  const toggleRoomChatlogs = () => setIsRoomChatlogsOpened(!isRoomChatlogsOpened);
  const toggleUserInfo = () => setIsUserInfoOpened(!isUserInfoOpened);
  const toggleTicketsBrowser = () => setIsTicketsBrowserOpened(!isTicketsBrowserOpened);

  const actions: Action[] = [
    {label: "Room Tools", onClick: () => toggleRoomTools(), disabled: !props.currentRoom},
    {label: "Room Chatlogs", onClick: () => toggleRoomChatlogs(), disabled: !props.currentRoom},
    {label: `User Info:${props.focusedUser ? ' ' + props.focusedUser.name : ""}`,
      onClick: () => toggleUserInfo(), disabled: !props.focusedUser},
    {label: "Tickets Browser", onClick: () => toggleTicketsBrowser()},
  ];

  return (
    <>
      <Window
        title="MOD Tools"
        width="200px"
        height="213px"
        onClose={props.onClose}
      >

        <div className="mod-tools__actions">
          {actions.map((action, index) =>
              <Button
                key={index} color="light"
                disabled={action.disabled}
                onClick={action.onClick}
              >

                {action.label}
              </Button>)}
        </div>
      </Window>

      {isRoomToolsOpened && props.currentRoom &&
          <RoomToolsWindow room={props.currentRoom} onClose={toggleRoomTools} />}

      {isRoomChatlogsOpened && props.currentRoom &&
          <RoomChatlogsWindow room={props.currentRoom} onClose={toggleRoomChatlogs} />}

      {isUserInfoOpened && props.focusedUser &&
          <UserInfoWindow user={props.focusedUser} onClose={toggleUserInfo} />}

      {isTicketsBrowserOpened &&
          <TicketsBrowserWindow onClose={toggleTicketsBrowser} />}
    </>
  );
};