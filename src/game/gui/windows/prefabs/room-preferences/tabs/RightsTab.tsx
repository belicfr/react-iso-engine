import {FC, useEffect, useState} from "react";
import {TabColumn} from "../components/TabColumn.tsx";
import {UserRow} from "../components/UserRow.tsx";
import {PublicUserDto} from "../../../../../../models/dto/public/PublicUserDto.ts";
import {useUser} from "../../../../../../io/users/UserContext.tsx";
import {RestrictedUserDto} from "../../../../../../models/dto/restricted/RestrictedUserDto.ts";
import {getPlayerById} from "../../../../../../io/rooms/RoomsIO.ts";
import {useConnection} from "../../../../../../io/ConnectionContext.tsx";
import {PublicRoomDto} from "../../../../../../models/dto/public/PublicRoomDto.ts";
import {Handler, HandlerResponseCode} from "../../../../../../io/HandlerResponse.ts";
import {RestrictedRoomDto} from "../../../../../../models/dto/restricted/RestrictedRoomDto.ts";
import {useAlerts} from "../../../AlertsContext.tsx";

type Props = {
  room: PublicRoomDto,
};

export const RightsTab: FC<Props> = ({room}) => {
  const user: RestrictedUserDto = useUser();

  const [havingRights, setHavingRights] = useState<PublicUserDto[]>([]);
  const [friendsWithoutRights, setFriendsWithoutRights] = useState<PublicUserDto[]>([]);

  const alerts = useAlerts();

  const filterFriendsWithoutRights = (rights: PublicUserDto[], prev: PublicUserDto[]): PublicUserDto[] =>
    prev.filter(friend =>
      rights.findIndex(u => friend.id === u.id) === -1).slice();

  const loadUserFriends = async () => {
    const friendsList: PublicUserDto[] = await Promise.all(
      user.friends.map(friendId =>
        getPlayerById(friendId)
          .then(r => r.json())
          .catch(err => {
            alerts.addAlert({
              id: Math.random(),
              title: "Error",
              content: err,
            });

            return null;
          })
      )
    );

    return friendsList.filter(friend => friend !== null); // Filtre les erreurs
  };

  const connection = useConnection();

  const giveRight = (friend: PublicUserDto) => {
    if (havingRights.findIndex(u => u.id === friend.id) > -1) return;

    connection.invoke("SendNewRoomRight", room.id, friend.id);
  };

  const removeRight = (userToRemove: PublicUserDto) => {
    if (havingRights.findIndex(u => u.id === userToRemove.id) === -1) return;

    connection.invoke("SendRemoveRoomRight", room.id, userToRemove.id);
  };

  useEffect(() => {
    connection.invoke("SendRoom", room.id);

    const handlerRoom = (response: RestrictedRoomDto) => {
      if (response) {
        setHavingRights(() => {
          loadUserFriends()
            .then(friends => {
              setFriendsWithoutRights(
                filterFriendsWithoutRights(
                  response.rights,
                  friends));
            });

          console.log("response", response);

          return response.rights;
        });
      } else {
        alerts.addAlert({
          id: Math.random(),
          title: "Error",
          content: "Room cannot be loaded. (Server Error)",
        });
      }
    };

    const handlerOnNewRoomRight: Handler = response => {
      if (response && response.code === HandlerResponseCode.SUCCESS) {
        setHavingRights(prevState => {
          const updatedHavingRights = [
            ...prevState,
            response.props[0]];

          setFriendsWithoutRights(prevFriends =>
            prevFriends.filter(friend =>
              !updatedHavingRights.some(u => u.id === friend.id)));

          return updatedHavingRights;
        });
      } else {
        alerts.addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    const handlerOnRemoveRoomRight: Handler = response => {
      if (response && response.code === HandlerResponseCode.SUCCESS) {
        setHavingRights(prevState => {
          const updatedHavingRights = prevState.filter(
            u => u.id !== response.props[0].id);

          loadUserFriends()
            .then(friends => {
              setFriendsWithoutRights(
                filterFriendsWithoutRights(
                  updatedHavingRights,
                  friends));
            });

          return updatedHavingRights;
        });
      } else {
        alerts.addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    connection.on("ReceiveRoom", handlerRoom);
    connection.on("ReceiveNewRoomRight", handlerOnNewRoomRight);
    connection.on("ReceiveRemoveRoomRight", handlerOnRemoveRoomRight);

    return () => {
      connection.off("ReceiveRoom", handlerRoom);
      connection.off("ReceiveNewRoomRight", handlerOnNewRoomRight);
      connection.off("ReceiveRemoveRoomRight", handlerOnRemoveRoomRight);
    };
  }, []);

  return (
    <>
      <section className="room-preferences__rights">
        <div className="room-preferences__left-side">
          <TabColumn
            title="Having Rights:"
          >

            {havingRights.map(havingRightsUser =>
              <UserRow
                key={havingRightsUser.id}
                user={havingRightsUser}

                onClick={removeRight}
              />)}
          </TabColumn>
        </div>

        <div className="rights__actions">
          {/*  */}
        </div>

        <div className="room-preferences__right-side">
          <TabColumn
            title="Your Friends:"
          >

            {friendsWithoutRights.map(friend =>
              <UserRow
                key={friend.id}
                user={friend}

                onClick={giveRight}
              />)}
          </TabColumn>
        </div>
      </section>
    </>
  );
};