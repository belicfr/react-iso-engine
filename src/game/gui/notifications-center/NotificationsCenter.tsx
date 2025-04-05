import {FC, useEffect, useRef} from "react";
import Notification from "../../../models/Notification.ts";
import {NotificationCard} from "./NotificationCard.tsx";
import gsap from "gsap";
import "./NotificationsCenter.css";

type Props = {
  notifications: Notification[],
  removeNotification: (id: number) => void,
};

export const NotificationsCenter: FC<Props> = props => {
  const notificationRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setNotificationRef = (id: number, node: HTMLDivElement|null) => {
    if (node) {
      notificationRefs.current.set(id, node);
    } else {
      notificationRefs.current.delete(id);
    }
  };

  const disappearNotification = (id: number, node: HTMLDivElement) => {
    const tl = gsap.timeline({paused: false});

    console.log("disappearing notif", id, node);

    tl
      .to(node, {
        duration: .8,
        delay: 0,

        opacity: 0,
      })
      .add(() => {
        props.removeNotification(id);
      })
      .play();
  };

  useEffect(() => {
    if (props.notifications.length) {
      const latestNotification: Notification
        = props.notifications[props.notifications.length - 1];

      const latestNotificationNode: HTMLDivElement|undefined
        = notificationRefs.current.get(latestNotification.id);

      console.log("check");

      if (latestNotificationNode) {
        console.log("node exists");
        setTimeout(() =>
            disappearNotification(
              latestNotification.id, latestNotificationNode),
          3_000);
      }
    }
  }, [props.notifications, props.removeNotification]);

  return (
    <>
      <div className="notifications-center__container">
        {props.notifications.map(notification =>
          <div key={notification.id}
               ref={(node: HTMLDivElement) => setNotificationRef(notification.id, node)}>

            <NotificationCard
              notification={notification}
            />
          </div>)}
      </div>
    </>
  );
};