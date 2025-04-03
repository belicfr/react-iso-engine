import {FC} from "react";
import "./CrownsIcon.css";

type Props = {
  size: string,
};

export const CrownsIcon: FC<Props> = props => {
  return (
    <>
    <div className="gui-crown-icon"
         style={{width: props.size, height: props.size}}></div>
    </>
  );
};