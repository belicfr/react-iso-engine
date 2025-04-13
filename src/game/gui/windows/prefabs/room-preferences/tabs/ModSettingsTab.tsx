import {FC} from "react";
import Room from "../../../../../../models/Room.ts";
import {SessionRepository} from "../../../../../../models/User.ts";
import {UserRow} from "../components/UserRow.tsx";
import {TabColumn} from "../components/TabColumn.tsx";
import {Button} from "../../../../buttons/Button.tsx";

type Props = {
  room: Room,
};

export const ModSettingsTab: FC<Props> = ({room}) => {
  return (
    <>
      <section className="room-preferences__mod-settings">
        <div className="room-preferences__left-side">
          <TabColumn
            title="Banned:"
          >

            {room.bannedUsers.map(bannedUser =>
                <UserRow
                  user={bannedUser}

                  onClick={() => {}}
                />)}
          </TabColumn>
        </div>

        <div className="mod-settings__actions">
          {/*  */}
        </div>

        <div className="room-preferences__right-side">
          <section className="room-preferences__mod-actions">
            <Button color="light">
              Words Filter
            </Button>

            <Button color="danger">
              Unban All
            </Button>
          </section>
        </div>
      </section>
    </>
  );
};