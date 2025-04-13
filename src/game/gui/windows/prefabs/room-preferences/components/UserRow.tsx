import User from "../../../../../../models/User.ts";
import {FC} from "react";
import "./UserRow.css";

type Props = {
  user: User,

  onClick: (user: User) => void,
};

export const UserRow: FC<Props> = ({user, onClick}) => {
  return (
    <>
      <div
        className="user-row"

        onClick={() => onClick(user)}
      >

        <div className="user-icon"></div>
        {user.name}
      </div>
    </>
  );
};