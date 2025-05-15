import {FC, useState} from "react";
import Room from "../../../../../../models/Room.ts";
import User from "../../../../../../models/User.ts";
import {UserRow} from "../components/UserRow.tsx";
import {TabColumn} from "../components/TabColumn.tsx";
import {Button} from "../../../../buttons/Button.tsx";
import {Action} from "../../../../../../frameworks/utilities/Actions.ts";

type Props = {
  room: Room,

  onWordsFilterToggle: Action,
};

export const ModSettingsTab: FC<Props> = ({room, onWordsFilterToggle}) => {
  const [ bannedUsers, setBannedUsers ] = useState<User[]>(room.bannedUsers.slice());

  const unbanUser = (user: User) => {
    const bannedUserIndex: number = room.bannedUsers.findIndex(u => u.id === user.id);

    if (bannedUserIndex === -1) return;

    room.bannedUsers.splice(bannedUserIndex, 1);
    setBannedUsers(room.bannedUsers);
  };

  const unbanAll = () => {
    room.bannedUsers = [];
    setBannedUsers([]);
  };

  return (
    <>
      <section className="room-preferences__mod-settings">
        <div className="room-preferences__left-side">
          <TabColumn
            title="Banned:"
          >

            {bannedUsers.map(bannedUser =>
                <UserRow
                  key={bannedUser.id}
                  user={bannedUser}

                  onClick={unbanUser}
                />)}
          </TabColumn>
        </div>

        <div className="mod-settings__actions">
          {/*  */}
        </div>

        <div className="room-preferences__right-side">
          <section className="room-preferences__mod-actions">
            <Button
              color="light"

              onClick={onWordsFilterToggle}
            >

              Words Filter
            </Button>

            <Button
              color="danger"

              onClick={unbanAll}
            >

              Unban All
            </Button>
          </section>
        </div>
      </section>
    </>
  );
};