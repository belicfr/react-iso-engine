import {FC, useState} from "react";
import {SmallButton} from "../buttons/SmallButton.tsx";
import "./StaffTools.css";
import {ModToolsWindow} from "./windows/ModToolsWindow.tsx";
import Room from "../../../models/Room.ts";
import User, {SessionRepository} from "../../../models/User.ts";
import AvatarEffect, {EAvatarEffect} from "../../room-view/entities/AvatarEffect.ts";

type Props = {
  canOpenModTools: boolean,
  canBeInvisible: boolean,
  canUseEffect: boolean,

  room: Room|null,
  user: User|null,
};

export const StaffTools: FC<Props> = props => {
  const user = SessionRepository.i().user;

  const [ isModToolsOpened, setIsModToolsOpened ] = useState(false);
  const [ isInvisible, setIsInvisible ] = useState(false);
  const [ isUsingEffect, setIsUsingEffect ] = useState(false);

  const toggleModTools = () => setIsModToolsOpened(!isModToolsOpened);
  const toggleInvisible = () => {
    user.invisible = !isInvisible;
    setIsInvisible(!isInvisible);
  };
  const toggleEffect = () => {
    user.avatarEffect = AvatarEffect.findByCode(isUsingEffect
      ? EAvatarEffect.NONE
      : EAvatarEffect.STAFF);

    setIsUsingEffect(!isUsingEffect)
  };

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
                color={isInvisible ? "danger" : "success"}
                onClick={toggleInvisible}
            >

                {isInvisible ? "Disable" : "Enable"}
                &nbsp;Invisible
            </SmallButton>}

        {props.canUseEffect &&
            <SmallButton
                color={isUsingEffect ? "danger" : "success"}
                onClick={toggleEffect}
            >

              {isUsingEffect ? "Disable" : "Enable"}
              &nbsp;Staff Effect
            </SmallButton>}
      </div>

      {isModToolsOpened &&
          <ModToolsWindow
            currentRoom={props.room}
            focusedUser={props.user}

            onClose={toggleModTools}
          />}
    </>
  );
};