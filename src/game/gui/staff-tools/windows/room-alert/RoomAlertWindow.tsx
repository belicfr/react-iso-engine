import {ChangeEvent, FC, useState} from "react";
import {Window} from "../../../windows/Window.tsx";
import {Action} from "../../../../../frameworks/types/Actions.ts";
import {TextArea} from "../../../forms/TextArea.tsx";
import {Button} from "../../../buttons/Button.tsx";
import "./RoomAlertWindow.css";

type Props = {
  onSend: (message: string) => void,
  onClose: Action,
};

export const RoomAlertWindow: FC<Props> = ({onSend, onClose}) => {
  const [message, setMessage] = useState<string>("");

  function send(e: ChangeEvent<HTMLButtonElement>) {
    e.preventDefault();

    console.log("room alert", message);

    // TODO: alert all users in room using server side sessions

    onSend(message);
    onClose();
  }

  return (
    <>
      <Window
        title="Room Alert"
        width="250px"
        height="225px"
        onClose={onClose}
      >

        <div className="room-alert__container">
          <form>
            <TextArea
              rows={5}
              resize="none"
              placeholder="Message here…"

              onInput={setMessage}
            />

            <div className="action-buttons">
              <Button
                onClick={send}
              >

                Send
              </Button>
            </div>
          </form>
        </div>
      </Window>
    </>
  );
};