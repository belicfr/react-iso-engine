import {FC} from "react";
import "./NavigationBar.css";

type Props = {
  onHomeClick: () => void,
};

export const NavigationBar: FC<Props> = props => {
  return (
    <>
      <div className="navigation-bar__container">
        <div className="navigation-bar">
          <div className="navigation-bar__icon-home"
               onClick={props.onHomeClick}></div>
        </div>
      </div>
    </>
  );
};