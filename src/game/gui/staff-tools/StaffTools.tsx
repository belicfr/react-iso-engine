import {FC, useState} from "react";
import {SmallButton} from "../buttons/SmallButton.tsx";
import "./StaffTools.css";
import {ModToolsWindow} from "./windows/ModToolsWindow.tsx";

type Props = {
  canOpenModTools: boolean,
  canBeInvisible: boolean,
  canUseEffect: boolean,
};

export const StaffTools: FC<Props> = props => {
  const [ isModToolsOpened, setIsModToolsOpened ] = useState(false);
  const [ isInvisible, setIsInvisible ] = useState(false);
  const [ isUsingEffect, setIsUsingEffect ] = useState(false);

  const toggleModTools = () => setIsModToolsOpened(!isModToolsOpened);
  const toggleInvisible = () => setIsInvisible(!isInvisible);
  const toggleEffect = () => setIsUsingEffect(!isUsingEffect);

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
          <ModToolsWindow onClose={toggleModTools} />}
    </>
  );
};