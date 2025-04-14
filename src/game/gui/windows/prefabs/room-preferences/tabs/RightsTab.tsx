import {FC, useState} from "react";
import Room, {RoomRepository} from "../../../../../../models/Room.ts";
import User, {SessionRepository} from "../../../../../../models/User.ts";
import {TabColumn} from "../components/TabColumn.tsx";
import {UserRow} from "../components/UserRow.tsx";

type Props = {
  room: Room,
};

export const RightsTab: FC<Props> = ({room}) => {
  const user: User = SessionRepository.i().user;

  const [ havingRights, setHavingRights ] = useState<User[]>(room.havingRightsUsers.slice());

  const filterFriendsWithoutRights = (prev: User[]): User[] =>
    prev.filter(friend =>
      havingRights.findIndex(u => friend.id === u.id) === -1).slice();

  const [ friends, setFriends ] = useState<User[]>(filterFriendsWithoutRights(user.friends));

  const giveRight = (user: User) => {
    const friendIndex: number = friends.findIndex(friend => friend.id === user.id);

    if (friendIndex === -1) return;

    RoomRepository.i().findById(room.id)?.havingRightsUsers.push(user);

    setHavingRights(prevState => {
      const updatedHavingRights = [...prevState, user];

      setFriends(prevFriends =>
        prevFriends.filter(friend =>
          !updatedHavingRights.some(u => u.id === friend.id)));


      return updatedHavingRights;
    });
  };

  const removeRight = (userToRemove: User) => {
    const userRightIndex: number = havingRights.findIndex(u => u.id === userToRemove.id);

    if (userRightIndex === -1) return;

    RoomRepository.i().findById(room.id)?.havingRightsUsers.splice(userRightIndex, 1);

    setHavingRights(prevState => {
      const updatedHavingRights = prevState.filter(u => u.id !== userToRemove.id);

      setFriends(() =>
        user.friends.filter(friend =>
          !updatedHavingRights.some(u => u.id === friend.id)));

      return updatedHavingRights;
    });
  };

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

            {friends.map(friend =>
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