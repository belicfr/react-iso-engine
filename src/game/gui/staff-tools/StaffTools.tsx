import {FC, useState} from "react";
import {SmallButton} from "../buttons/SmallButton.tsx";
import "./StaffTools.css";
import {ModToolsWindow} from "./windows/ModToolsWindow.tsx";
import Room from "../../../models/Room.ts";
import User from "../../../models/User.ts";
import {AlertAction} from "../../../models/Alert.ts";

type Props = {
  canOpenModTools: boolean,
  canBeInvisible: boolean,
  canUseEffect: boolean,

  room: Room|null,
  user: User|null,

  isInvisible: boolean,
  isUsingStaffEffect: boolean,

  onInvisibleToggle: () => void,
  onEffectToggle: () => void,

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

            onOwnRoom={props.onOwnRoom}
            onClose={toggleModTools}
          />}
    </>
  );
};