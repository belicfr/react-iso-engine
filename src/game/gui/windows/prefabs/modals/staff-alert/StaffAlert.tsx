import {FC} from "react";
import {SessionRepository} from "../../../../../../models/User.ts";
import {ModalWindow} from "../../../ModalWindow.tsx";
import Alert from "../../../../../../models/Alert.ts";
import "./StaffAlert.css";
import Markdown from "react-markdown";
import {Button} from "../../../../buttons/Button.tsx";
import {AlertAction} from "../../../../../../frameworks/types/Actions.ts";
import {PublicAlertDto} from "../../../../../../models/dto/public/PublicAlertDto.ts";

type Props = {
  alert: PublicAlertDto,

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
      height="auto"
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