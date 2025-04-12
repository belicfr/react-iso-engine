import {FC, useState} from "react";
import "./TopOptions.css";
import {CrownsIcon} from "../../../frameworks/icons/CrownsIcon.tsx";
import {SmallButton} from "../buttons/SmallButton.tsx";
import {ModalWindow} from "../windows/ModalWindow.tsx";
import {Button} from "../buttons/Button.tsx";
import {NotificationsCenter} from "../notifications-center/NotificationsCenter.tsx";
import Notification from "../../../models/Notification.ts";

type Props = {
  canAccessRoomPreferences: boolean,

  onRoomPreferencesClick: () => void,
};

export const TopOptions: FC<Props> = (
  {
    canAccessRoomPreferences,

    onRoomPreferencesClick
  }
) => {
  const [isHelpWindowOpened, setIsHelpWindowOpened] = useState(false);

  const [ notifications, setNotifications ] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications(prevState => [notification, ...prevState]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prevState => prevState.filter(n => n.id !== id));
  };

  return (
    <>
      <div className="top-container">
        <div className="top-options__container">
          <div className="top-options__currencies">
            <div className="top-options__credits">
              <CrownsIcon size="20px"/>
              100
            </div>
          </div>

          <div className="top-options__separator"></div>

          <div className="top-options__actions">
            <SmallButton onClick={() => setIsHelpWindowOpened(true)}>
              Help
            </SmallButton>

            <SmallButton color="secondary">
              Options
            </SmallButton>
          </div>
        </div>

        <div className="room-widgets">
          {canAccessRoomPreferences &&
              <Button
                color="secondary"

                onClick={onRoomPreferencesClick}
              >

                  Room Preferences
              </Button>}
        </div>

        <div className="notifications-center">
          <NotificationsCenter
            notifications={notifications}
            removeNotification={removeNotification}
          />
        </div>
      </div>

      {isHelpWindowOpened &&
          <ModalWindow
              title="Help"
              width="500px"
              height="auto"
              onClose={() => setIsHelpWindowOpened(false)}>

              <div className="help-window__content">
                  <h3>
                      Do you need assistance?
                  </h3>

                  <div className="help-actions">
                      <Button color="danger">
                          Report an User
                      </Button>

                      <Button color="danger">
                          I need Help
                      </Button>
                  </div>
              </div>
          </ModalWindow>}
    </>
  );
};