import {FC} from "react";
import {SessionRepository} from "../../../../../../models/User.ts";
import {ModalWindow} from "../../../ModalWindow.tsx";
import Alert, {AlertAction} from "../../../../../../models/Alert.ts";
import "./StaffAlert.css";
import Markdown from "react-markdown";
import {Button} from "../../../../buttons/Button.tsx";

type Props = {
  alert: Alert,

  onClose: AlertAction,
};

export const StaffAlert: FC<Props> = ({alert, onClose}) => {
  function close() {
    SessionRepository.i().closeAlert(alert.id);
    onClose(alert);
  }

  return (
    <ModalWindow
      title={alert.title}
      width="450px"
      height="250px"
      onClose={close}
    >

      <div className="staff-alert__container">
        <div className="staff-alert__content">
          <Markdown>
            {alert.content}
          </Markdown>
        </div>

        <div className="staff-alert__action-buttons">
          <Button
            color="light"
            onClick={close}
          >

            OK
          </Button>
        </div>
      </div>
    </ModalWindow>
  );
};