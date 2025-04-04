import {FC, useEffect, useState} from "react";
import {Window} from "../../windows/Window.tsx";
import {Button} from "../../buttons/Button.tsx";
import "./ModToolsWindow.css";
import {RoomToolsWindow} from "./RoomToolsWindow.tsx";
import {RoomChatlogsWindow} from "./RoomChatlogsWindow.tsx";
import {UserInfoWindow} from "./UserInfoWindow.tsx";
import {TicketsBrowserWindow} from "./TicketsBrowserWindow.tsx";
import User from "../../../../models/User.ts";

type Props = {
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

  const [ focusedUser, setFocusedUser ] = useState<User|null>(null);

  const toggleRoomTools = () => setIsRoomToolsOpened(!isRoomToolsOpened);
  const toggleRoomChatlogs = () => setIsRoomChatlogsOpened(!isRoomChatlogsOpened);
  const toggleUserInfo = () => setIsUserInfoOpened(!isUserInfoOpened);
  const toggleTicketsBrowser = () => setIsTicketsBrowserOpened(!isTicketsBrowserOpened);

  const actions: Action[] = [
    {label: "Room Tools", onClick: () => toggleRoomTools()},
    {label: "Room Chatlogs", onClick: () => toggleRoomChatlogs()},
    {label: `User Info:${focusedUser ? ' ' + focusedUser.name : ""}`,
      onClick: () => toggleUserInfo(), disabled: !focusedUser},
    {label: "Tickets Browser", onClick: () => toggleTicketsBrowser()},
  ];

  useEffect(() => {
    setFocusedUser(new User(12, "Mikael"));
  }, []);

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

      {isRoomToolsOpened &&
          <RoomToolsWindow onClose={toggleRoomTools} />}

      {isRoomChatlogsOpened &&
          <RoomChatlogsWindow onClose={toggleRoomChatlogs} />}

      {isUserInfoOpened && focusedUser &&
          <UserInfoWindow user={focusedUser} onClose={toggleUserInfo} />}

      {isTicketsBrowserOpened &&
          <TicketsBrowserWindow onClose={toggleTicketsBrowser} />}
    </>
  );
};