import {FC} from "react";
import "./CloseButton.css";

type Props = {
  onClick: () => void,
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