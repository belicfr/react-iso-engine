import {FC, useState} from "react";
import {SmallButton} from "../buttons/SmallButton.tsx";
import "./StaffTools.css";
import {ModToolsWindow} from "./windows/ModToolsWindow.tsx";
import Room from "../../../models/Room.ts";
import {Action, AlertAction} from "../../../frameworks/types/Actions.ts";
import {PublicRoomDto} from "../../../models/dto/public/PublicRoomDto.ts";
import {PublicUserDto} from "../../../models/dto/public/PublicUserDto.ts";

type Props = {
  canOpenModTools: boolean,
  canBeInvisible: boolean,
  canUseEffect: boolean,

  room: PublicRoomDto|null,
  user: PublicUserDto|null,

  isInvisible: boolean,
  isUsingStaffEffect: boolean,

  onInvisibleToggle: Action,
  onEffectToggle: Action,

  onRoomAlert: (room: Room, message: string) => void,
  onOwnRoom: AlertAction,
};

export const StaffTools: FC<Props> = props => {
  const [ isModToolsOpened, setIsModToolsOpened ] = useState(false);

  const toggleModTools = () => setIsModToolsOpened(!isModToolsOpened);

  return (
    <>
      <div className="staff-buttons">
        {props.canOpenModTools &&
            <SmallButton
                color="secondary"
                onClick={toggleModTools}
            >

                MOD Tools
            </SmallButton>}

        {props.canBeInvisible &&
            <SmallButton
                color={props.isInvisible ? "danger" : "success"}
                onClick={props.onInvisibleToggle}
            >

                {props.isInvisible ? "Disable" : "Enable"}
                &nbsp;Invisible
            </SmallButton>}

        {props.canUseEffect &&
            <SmallButton
                color={props.isUsingStaffEffect ? "danger" : "success"}
                onClick={props.onEffectToggle}
            >

              {props.isUsingStaffEffect ? "Disable" : "Enable"}
              &nbsp;Staff Effect
            </SmallButton>}
      </div>

      {isModToolsOpened &&
          <ModToolsWindow
            currentRoom={props.room}
            focusedUser={props.user}

            onRoomAlert={props.onRoomAlert}
            onOwnRoom={props.onOwnRoom}
            onClose={toggleModTools}
          />}
    </>
  );
};