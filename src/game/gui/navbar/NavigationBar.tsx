import {FC} from "react";
import "./NavigationBar.css";
import {Action} from "../../../frameworks/utilities/Actions.ts";

type Props = {
  isInHotelView: boolean,

  onHomeClick: Action,
  onHotelViewClick: Action,
  onRoomsNavigatorClick: Action,
  onInventoryClick: Action,
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

          <div className="navigation-bar__icon-inventory"
               onClick={props.onInventoryClick}></div>
        </div>
      </div>
    </>
  );
};