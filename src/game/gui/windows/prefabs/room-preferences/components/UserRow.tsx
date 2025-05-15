import {FC} from "react";
import "./UserRow.css";
import {PublicUserDto} from "../../../../../../models/dto/public/PublicUserDto.ts";
import {UserAction} from "../../../../../../frameworks/types/Actions.ts";

type Props = {
  user: PublicUserDto,

  onClick: UserAction,
};

export const UserRow: FC<Props> = ({user, onClick}) => {
  return (
    <>
      <div
        className="user-row"

        onClick={() => onClick(user)}
      >

        <div className="user-icon"></div>
        {user.userName}
      </div>
    </>
  );
};