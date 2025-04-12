import {FC} from "react";
import "./NavigationBar.css";

type Props = {
  isInHotelView: boolean,

  onHomeClick: () => void,
  onHotelViewClick: () => void,
  onRoomsNavigatorClick: () => void,
};

export const NavigationBar: FC<Props> = props => {
  return (
    <>
      <div className="navigation-bar__container">
        <div className="navigation-bar">
          {props.isInHotelView &&
              <div className="navigation-bar__icon-home"
                   onClick={props.onHomeClick}></div>}

          {!props.isInHotelView &&
              <div className="navigation-bar__icon-hotel-view"
                   onClick={props.onHotelViewClick}></div>}

          <div className="navigation-bar__icon-rooms-navigator"
               onClick={props.onRoomsNavigatorClick}></div>
        </div>
      </div>
    </>
  );
};