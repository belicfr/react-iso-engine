import {FC} from "react";
import "./CloseButton.css";
import {Action} from "../../../../frameworks/utilities/Actions.ts";

type Props = {
  onClick: Action,
};

export const CloseButton: FC<Props> = props => {
  return (
    <>
    <div className="close-button" onClick={props.onClick}>
      <div className="close-icon"></div>
    </div>
    </>
  );
};