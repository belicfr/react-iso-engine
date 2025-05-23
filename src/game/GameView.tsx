import {FC, useEffect, useRef, useState} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";
import {NavigationBar} from "./gui/navbar/NavigationBar.tsx";
import {TopOptions} from "./gui/top-options/TopOptions.tsx";
import {ModalWindow} from "./gui/windows/ModalWindow.tsx";
import {RoomsNavigatorWindow} from "./gui/windows/prefabs/rooms-navigator/RoomsNavigatorWindow.tsx";
import {StaffTools} from "./gui/staff-tools/StaffTools.tsx";
import {RoomViewContainer} from "./room-view/components/room/RoomViewContainer.tsx";
import User from "../models/User.ts";
import AvatarEffect, {EAvatarEffect} from "./room-view/entities/AvatarEffect.ts";
import {useUser} from "../io/users/UserContext.tsx";
import {PublicRoomDto} from "../models/dto/public/PublicRoomDto.ts";
import {useConnection} from "../io/ConnectionContext.tsx";
import {Handler, HandlerResponseCode} from "../io/HandlerResponse.ts";
import {RestrictedUserDto} from "../models/dto/restricted/RestrictedUserDto.ts";
import {useAlerts} from "./gui/windows/AlertsContext.tsx";
import {PublicUserDto} from "../models/dto/public/PublicUserDto.ts";

export const GameView: FC = () => {
  const [ isHotelViewOpened, setIsHotelViewOpened ] = useState(true);
  const [ isCanvasAllowed, setIsCanvasAllowed ] = useState<boolean>(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);
  const [ isRoomsNavigatorWindowOpened, setIsRoomsNavigatorWindowOpened ] = useState(false);
  const [ isRoomPreferencesWindowOpened, setIsRoomPreferencesWindowOpened ] = useState<boolean>(false);

  const onHomeClick = () => {
    if (user && user.homeRoomId) {
      onRoomClick(user.homeRoomId);
    }
  };
  const onHotelViewClick = () => {
    setCurrentRoom(null);
    setPlayersInCurrentRoom([]);
    setIsHotelViewOpened(true);

    // user.currentPosition = {x: 0, y: 0};
    // user.currentRoom = null;

    connection.invoke("SendGoToHotelView");
  };
  const onRoomsNavigatorClick = () =>
    setIsRoomsNavigatorWindowOpened(!isRoomsNavigatorWindowOpened);

  const closeRoomsNavigator = () => setIsRoomsNavigatorWindowOpened(false);

  const isClientPrepared = useRef<boolean>(false);

  // const rooms: Room[] = RoomRepository.i().rooms;
  const [currentRoom, setCurrentRoom] = useState<PublicRoomDto|null>(null);
  const [playersInCurrentRoom, setPlayersInCurrentRoom] = useState<PublicUserDto[]>([]);

  const [focusedPlayer, setFocusedPlayer] = useState<PublicUserDto|null>(null);

  const user: RestrictedUserDto = useUser();

  // const [ isPlayerInvisible, setIsPlayerInvisible ] = useState<boolean>(user.invisible);
  // const [ isUsingStaffEffect, setIsUsingStaffEffect ]
  //   = useState<boolean>(user.avatarEffect.code === EAvatarEffect.STAFF);

  const connection = useConnection();
  const {addAlert} = useAlerts();

  useEffect(() => {
    if (!isClientPrepared.current) {
      console.log("USER DTO", user);

      isClientPrepared.current = true;
    }

    const handlerRoomEnterAttempt: Handler = response => {
      if (response.code === HandlerResponseCode.SUCCESS) {
        setIsHotelViewOpened(false);
        reloadCanvas();
        setCurrentRoom(response.props[0]);
      } else {
        addAlert({
          id: Math.random(),
          title: "Message",
          content: response.message,
        });
      }
    };

    const handlerRoomUpdate = (response: PublicRoomDto) => {
      setCurrentRoom(response);
    };

    const handlerGoToHotelView: Handler = response => {
      if (response.code === HandlerResponseCode.SUCCESS) {
        console.log("** GONE TO HOTEL VIEW **");
      } else {
        addAlert({
          id: Math.random(),
          title: "Error",
          content: response.message,
        });
      }
    };

    connection.on("ReceiveRoomEnterAttempt", handlerRoomEnterAttempt);
    connection.on("ReceiveRoomUpdate", handlerRoomUpdate);
    connection.on("ReceiveGoToHotelView", handlerGoToHotelView);

    return () => {
      connection.off("ReceiveRoomEnterAttempt", handlerRoomEnterAttempt);
      connection.off("ReceiveRoomUpdate", handlerRoomUpdate);
      connection.off("ReceiveGoToHotelView", handlerGoToHotelView);
    };
  }, []);

  function onRoomClick(roomId: string) {
    setIsRoomsNavigatorWindowOpened(false);

    // user.roomsHistory.push(room);

    console.log("check room", roomId);

    // if (!user.invisible) {
      connection.invoke("SendRoomEnterAttempt", roomId);
      // user.currentRoom = room;
    // }

    // setPlayersInCurrentRoom(room.playersInRoom);
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

  function roomAlert(message: string) {
    addAlert({
      id: Math.random(),
      title: "Room Alert",
      content: message,
    });
  }

  function canManageRoom(): boolean {
    return !!currentRoom && (currentRoom.ownerId === user.id /*|| user.permissions.isStaff*/);
  }

  return (
    <>
      <TopOptions
        room={currentRoom}

        canAccessRoomPreferences={canManageRoom()}

        onRoomPreferencesClick={() =>
          setIsRoomPreferencesWindowOpened(!isRoomPreferencesWindowOpened)}
      />

      {/*{user.permissions.isStaff &&*/}
      {/*    <StaffTools*/}
      {/*        canOpenModTools={user.permissions.canUseModTools}*/}
      {/*        canBeInvisible={user.permissions.canBeInvisible}*/}
      {/*        canUseEffect={user.permissions.canUseStaffEffect}*/}

      {/*        room={currentRoom}*/}
      {/*        user={focusedPlayer}*/}

      {/*        isInvisible={isPlayerInvisible}*/}
      {/*        isUsingStaffEffect={isUsingStaffEffect}*/}

      {/*        onInvisibleToggle={onInvisibleToggle}*/}
      {/*        onEffectToggle={onStaffEffectToggle}*/}

      {/*        onRoomAlert={roomAlert}*/}
      {/*        onOwnRoom={alert}*/}
      {/*    />}*/}

      {isHotelViewOpened &&
          <HotelView />}

      {!isHotelViewOpened && currentRoom && isCanvasAllowed &&
          <RoomViewContainer
            room={currentRoom}
            players={playersInCurrentRoom}

            canManageRoom={canManageRoom()}

            isRoomPreferencesWindowOpened={isRoomPreferencesWindowOpened}

            onRoomPreferencesClose={() => setIsRoomPreferencesWindowOpened(false)}
            onPlayerFocus={user => setFocusedPlayer(user)}
            onRoomUpdate={room => setCurrentRoom(room)}
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

      {isRoomsNavigatorWindowOpened &&
        <RoomsNavigatorWindow
          onRoomClick={(room: PublicRoomDto) => onRoomClick(room.id)}
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