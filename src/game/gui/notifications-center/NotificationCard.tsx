import {FC} from "react";
import Notification from "../../../models/Notification.ts";
import "./NotificationCard.css";

type Props = {
  notification: Notification,
};

export const NotificationCard: FC<Props> = props => {
  return (
    <>
      <div className="notification-card">
        <p className="notification-title">
          {props.notification.title}
        </p>

        <p className="notification-description">
          {props.notification.description}
        </p>
      </div>
    </>
  );
};