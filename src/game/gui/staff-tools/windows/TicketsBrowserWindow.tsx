import {FC} from "react";
import {Window} from "../../windows/Window.tsx";

type Props = {
  onClose: () => void,
};

export const TicketsBrowserWindow: FC<Props> = props => {
  return (
    <>
      <Window
        title="Tickets Browser"
        width="450px"
        height="250px"
        onClose={props.onClose}
      >

        tickets browser;stub
      </Window>
    </>
  );
};