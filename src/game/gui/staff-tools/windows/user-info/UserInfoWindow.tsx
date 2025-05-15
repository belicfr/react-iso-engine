import {FC} from "react";
import {Window} from "../../../windows/Window.tsx";
import User from "../../../../../models/User.ts";
import {Action} from "../../../../../frameworks/utilities/Actions.ts";

type Props = {
  user: User,

  onClose: Action,
};

export const UserInfoWindow: FC<Props> = props => {
  return (
    <>
      <Window
        title={`User Info: ${props.user.name}`}
        width="400px"
        height="300px"
        onClose={props.onClose}
      >

        user info;stub
      </Window>
    </>
  );
};