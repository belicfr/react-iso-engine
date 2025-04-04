import {FC} from "react";
import {Window} from "../../windows/Window.tsx";

type Props = {
  onClose: () => void,
};

export const RoomToolsWindow: FC<Props> = props => {
  return (
    <>
      <Window
        title="Room Tools"
        width="400px"
        height="300px"
        onClose={props.onClose}
      >

        room tools;stub
      </Window>
    </>
  );
};