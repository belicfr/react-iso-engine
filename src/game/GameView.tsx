import {FC, useEffect, useRef, useState} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";
import {NavigationBar} from "./gui/navbar/NavigationBar.tsx";
import {TopOptions} from "./gui/top-options/TopOptions.tsx";
import {ModalWindow} from "./gui/windows/ModalWindow.tsx";
import {RoomsNavigatorWindow} from "./gui/windows/prefabs/rooms-navigator/RoomsNavigatorWindow.tsx";
import {StaffTools} from "./gui/staff-tools/StaffTools.tsx";
import GameSocket from "./room-view/engine/socket/GameSocket.ts";
import Room, {RoomRepository} from "../models/Room.ts";
import {RoomViewContainer} from "./room-view/components/room/RoomViewContainer.tsx";
import User, {SessionRepository, UserRepository} from "../models/User.ts";
import AvatarEffect, {EAvatarEffect} from "./room-view/entities/AvatarEffect.ts";
import Alert from "../models/Alert.ts";
import {StaffAlert} from "./gui/windows/prefabs/modals/staff-alert/StaffAlert.tsx";

export const GameView: FC = () => {
  const [ isHotelViewOpened, setIsHotelViewOpened ] = useState(true);
  const [ isCanvasAllowed, setIsCanvasAllowed ] = useState<boolean>(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);
  const [ isRoomsNavigatorWindowOpened, setIsRoomsNavigatorWindowOpened ] = useState(false);
  const [ isRoomPreferencesWindowOpened, setIsRoomPreferencesWindowOpened ] = useState<boolean>(false);

  const onHomeClick = () => {
    if (user.home) {
      onRoomClick(user.home);
    }
  };
  const onHotelViewClick = () => {
    setCurrentRoom(null);
    setPlayersInCurrentRoom([]);
    setIsHotelViewOpened(true);

    user.currentPosition = {x: 0, y: 0};
    user.currentRoom = null;
  };
  const onRoomsNavigatorClick = () =>
    setIsRoomsNavigatorWindowOpened(!isRoomsNavigatorWindowOpened);

  const closeRoomsNavigator = () => setIsRoomsNavigatorWindowOpened(false);

  const isClientPrepared = useRef<boolean>(false);

  const rooms: Room[] = RoomRepository.i().rooms;
  const [currentRoom, setCurrentRoom] = useState<Room|null>(null);
  const [playersInCurrentRoom, setPlayersInCurrentRoom] = useState<User[]>([]);

  const [focusedPlayer, setFocusedPlayer] = useState<User|null>(null);

  const user: User = SessionRepository.i().user;
  const [ alerts, setAlerts ] = useState<Alert[]>([]);

  const [ isPlayerInvisible, setIsPlayerInvisible ] = useState<boolean>(user.invisible);
  const [ isUsingStaffEffect, setIsUsingStaffEffect ]
    = useState<boolean>(user.avatarEffect.code === EAvatarEffect.STAFF);

  useEffect(() => {
    function prepareClient() {
      const socket: GameSocket = GameSocket.get();

      console.log("Connected to Socket", socket);
    }

    if (!isClientPrepared.current) {
      prepareClient();

      const demoRoom = RoomRepository.i().findById(1)!;
      demoRoom.bannedUsers.push(UserRepository.i().findById(2)!);
      demoRoom.havingRightsUsers.push(UserRepository.i().findById(2)!);

      user.friends.push(UserRepository.i().findById(1)!);
      user.home = demoRoom;

      isClientPrepared.current = true;
    }
  }, []);

  function onRoomClick(room: Room) {
    setCurrentRoom(room);
    setIsHotelViewOpened(false);
    setIsRoomsNavigatorWindowOpened(false);

    reloadCanvas();

    user.roomsHistory.push(room);

    console.log("check room", room);

    if (!user.invisible) {
      if (user.currentRoom) {
        user.currentRoom.leave(user);
      }

      room.enter(user);
      user.currentRoom = room;
    }

    setPlayersInCurrentRoom(room.playersInRoom);
  }

  function reloadCanvas() {
    setIsCanvasAllowed(false);

    setTimeout(() => setIsCanvasAllowed(true), 100);
  }

  function onInvisibleToggle() {
    user.invisible = !user.invisible;

    setIsPlayerInvisible(prevState => {
      const newState: boolean = !prevState;

      if (currentRoom) {
        if (!newState) {
          currentRoom.enter(user);

          setPlayersInCurrentRoom(prevState => [
            ...prevState.filter(u => u.id !== user.id),
            user,
          ]);

          user.currentRoom = currentRoom;
        } else {
          currentRoom.leave(user);

          setPlayersInCurrentRoom(prevState =>
            prevState.filter(u => u.id !== user.id));

          user.currentRoom = null;
        }
      }

      return newState;
    });

  }

  function onStaffEffectToggle() {
    setPlayersInCurrentRoom(prevState => {
      const player: User|undefined = prevState.find(u => u.id === user.id);

      if (!player) return prevState;

      const state: boolean
        = player.avatarEffect.code === EAvatarEffect.STAFF;

      player.avatarEffect = state
        ? AvatarEffect.findByCode(EAvatarEffect.NONE)
        : AvatarEffect.findByCode(EAvatarEffect.STAFF);

      setIsUsingStaffEffect(!state);

      if (!currentRoom) return prevState;

      const updatedPlayersList: User[] = [
        ...prevState.filter(u => u.id !== player.id),
        player,
      ];

      currentRoom.playersInRoom = updatedPlayersList;

      return updatedPlayersList;
    });
  }

  function alert(alert: Alert) {
    setAlerts(prevState => [
      ...prevState,
      alert,
    ]);
  }

  function closeAlert(alert: Alert) {
    setAlerts(prevState => [
      ...prevState.filter(a => a.id !== alert.id),
    ]);
  }

  return (
    <>
      <TopOptions
        canAccessRoomPreferences={!!currentRoom}

        onRoomPreferencesClick={() =>
          setIsRoomPreferencesWindowOpened(!isRoomPreferencesWindowOpened)}
      />

      {user.permissions.isStaff &&
          <StaffTools
              canOpenModTools={user.permissions.canUseModTools}
              canBeInvisible={user.permissions.canBeInvisible}
              canUseEffect={user.permissions.canUseStaffEffect}

              room={currentRoom}
              user={focusedPlayer}

              isInvisible={isPlayerInvisible}
              isUsingStaffEffect={isUsingStaffEffect}

              onInvisibleToggle={onInvisibleToggle}
              onEffectToggle={onStaffEffectToggle}

              onOwnRoom={alert}
          />}

      {isHotelViewOpened &&
          <HotelView />}

      {!isHotelViewOpened && currentRoom && isCanvasAllowed &&
          <RoomViewContainer
            room={currentRoom}
            players={playersInCurrentRoom}

            isRoomPreferencesWindowOpened={isRoomPreferencesWindowOpened}

            onRoomPreferencesClose={() => setIsRoomPreferencesWindowOpened(false)}
            onPlayerFocus={user => setFocusedPlayer(user)}
          />}

      {isWelcomeWindowOpened &&
          <ModalWindow
            title="Welcome"
            width="auto"
            height="auto"

            onClose={() => setIsWelcomeWindowOpened(false)}
          >

              <p style={{margin: "20px"}}>
                  Welcome to this Demo.
                  This engine is under development.
              </p>
          </ModalWindow>}

      {alerts.map(alert =>
        <StaffAlert
          alert={alert}

          onClose={closeAlert}
        />)}

      {isRoomsNavigatorWindowOpened &&
        <RoomsNavigatorWindow
          rooms={rooms}

          onRoomClick={(room: Room) => onRoomClick(room)}
          onClose={closeRoomsNavigator}
        />}

      <NavigationBar
        isInHotelView={isHotelViewOpened}

        onHomeClick={onHomeClick}
        onHotelViewClick={onHotelViewClick}
        onRoomsNavigatorClick={onRoomsNavigatorClick}
        onInventoryClick={() => {}}
      />
    </>
  );
};