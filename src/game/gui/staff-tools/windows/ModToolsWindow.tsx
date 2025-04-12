import {FC, useState} from "react";
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
  currentRoom: Room|null,
  focusedUser: User|null,

  onClose: () => void,
};

type Action = {
  label: string,
  onClick: () => void,
  disabled?: boolean,
}

export const ModToolsWindow: FC<Props> = props => {
  const [ isRoomToolsOpened, setIsRoomToolsOpened ] = useState<boolean>(false);
  const [ isRoomChatlogsOpened, setIsRoomChatlogsOpened ] = useState<boolean>(false);
  const [ usersInfo, setUsersInfo ] = useState<User[]>([]);
  const [ isTicketsBrowserOpened, setIsTicketsBrowserOpened ] = useState<boolean>(false);

  const toggleRoomTools = () =>
    setIsRoomToolsOpened(!isRoomToolsOpened);
  const toggleRoomChatlogs = () =>
    setIsRoomChatlogsOpened(!isRoomChatlogsOpened);
  const openUserInfo = () =>
    setUsersInfo(prevState => [...prevState, props.focusedUser!]);
  const closeUserInfo = (user: User) =>
    setUsersInfo(usersInfo.filter(u => u !== user));
  const toggleTicketsBrowser = () =>
    setIsTicketsBrowserOpened(!isTicketsBrowserOpened);

  const actions: Action[] = [
    {label: "Room Tools", onClick: () => toggleRoomTools(), disabled: !props.currentRoom},
    {label: "Room Chatlogs", onClick: () => toggleRoomChatlogs(), disabled: !props.currentRoom},
    {label: `User Info:${props.focusedUser ? ' ' + props.focusedUser.name : ""}`,
      onClick: () => openUserInfo(), disabled: !props.focusedUser},
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
          <RoomToolsWindow
            room={props.currentRoom}

            onClose={toggleRoomTools}
          />}

      {isRoomChatlogsOpened && props.currentRoom &&
          <RoomChatlogsWindow
            room={props.currentRoom}

            onClose={toggleRoomChatlogs}
          />}

      {usersInfo.map(focusedUser =>
          /*  TODO: verify if impl is good!  */
          <UserInfoWindow
            user={focusedUser}
            onClose={() => closeUserInfo(focusedUser)}
          />)}

      {isTicketsBrowserOpened &&
          <TicketsBrowserWindow
            onClose={toggleTicketsBrowser}
          />}
    </>
  );
};