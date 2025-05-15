import {FC, useEffect, useState} from "react";
import {UserRow} from "../components/UserRow.tsx";
import {TabColumn} from "../components/TabColumn.tsx";
import {Button} from "../../../../buttons/Button.tsx";
import {Action} from "../../../../../../frameworks/types/Actions.ts";
import {RestrictedRoomDto} from "../../../../../../models/dto/restricted/RestrictedRoomDto.ts";
import {PublicUserDto} from "../../../../../../models/dto/public/PublicUserDto.ts";
import {PublicRoomDto} from "../../../../../../models/dto/public/PublicRoomDto.ts";
import {useConnection} from "../../../../../../io/ConnectionContext.tsx";
import {useAlerts} from "../../../AlertsContext.tsx";
import {Handler, HandlerResponseCode} from "../../../../../../io/HandlerResponse.ts";

type Props = {
  room: PublicRoomDto,

  onWordsFilterToggle: Action,
};

export const ModSettingsTab: FC<Props> = ({room, onWordsFilterToggle}) => {
  const [ bannedUsers, setBannedUsers ] = useState<PublicUserDto[]>([]);

  const unbanUser = (user: PublicUserDto) => {
    if (!bannedUsers.includes(user)) return;

    connection.invoke("SendUnbanUserFromRoom", room.id, user.id);
  };

  const unbanAll = () => {
    if (!bannedUsers.length) return;

    connection.invoke("SendUnbanAllFromRoom", room.id);
  };

  const connection = useConnection();
  const {addAlert} = useAlerts();

  useEffect(() => {
    connection.invoke("SendRoom", room.id);

    const handlerRoom = (response: RestrictedRoomDto) => {
      if (response) {
        console.log("check response room", response, response.bans);
        setBannedUsers(response.bans);
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: "Room cannot be loaded. (Server Error)",
        });
      }
    };

    const handlerUnban: Handler = response => {
      if (response && response.code === HandlerResponseCode.SUCCESS) {
        setBannedUsers(prevState =>
          prevState.filter(u => u.id !== response.props[0].id));
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    const handlerUnbanAll: Handler = response => {
      if (response.code === HandlerResponseCode.SUCCESS) {
        setBannedUsers([]);
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    connection.on("ReceiveRoom", handlerRoom);
    connection.on("ReceiveUnbanUserFromRoom", handlerUnban);
    connection.on("ReceiveUnbanAllFromRoom", handlerUnbanAll);

    return () => {
      connection.off("ReceiveRoom", handlerRoom);
      connection.off("ReceiveUnbanUserFromRoom", handlerUnban);
      connection.off("ReceiveUnbanAllFromRoom", handlerUnbanAll);
    };
  }, []);

  return (
    <>
      <section className="room-preferences__mod-settings">
        <div className="room-preferences__left-side">
          <TabColumn
            title="Banned:"
          >

            {bannedUsers.map((bannedUser, i) =>
                <UserRow
                  key={i}
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