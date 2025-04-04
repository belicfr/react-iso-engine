import {FC} from "react";
import {Window} from "../../windows/Window.tsx";

type Props = {
  onClose: () => void,
};

export const RoomChatlogsWindow: FC<Props> = props => {
  return (
    <>
      <Window
        title="Room Chatlogs"
        width="400px"
        height="300px"
        onClose={props.onClose}
      >

        room chatlogs;stub
      </Window>
    </>
  );
};