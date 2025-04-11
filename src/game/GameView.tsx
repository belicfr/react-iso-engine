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
import User from "../models/User.ts";

export const GameView: FC = () => {
  const [ isHotelViewOpened, setIsHotelViewOpened ] = useState(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);
  const [ isRoomsNavigatorWindowOpened, setIsRoomsNavigatorWindowOpened ] = useState(false);
  const [ isRoomPreferencesWindowOpened, setIsRoomPreferencesWindowOpened ] = useState<boolean>(false);

  const onHomeClick = () => setIsHotelViewOpened(false);
  const onHotelViewClick = () => setIsHotelViewOpened(true);
  const onRoomsNavigatorClick = () =>
    setIsRoomsNavigatorWindowOpened(!isRoomsNavigatorWindowOpened);

  const closeRoomsNavigator = () => setIsRoomsNavigatorWindowOpened(false);

  const isClientPrepared = useRef<boolean>(false);

  //TEMP
  const rooms = RoomRepository.i().rooms;
  const [currentRoom, setCurrentRoom] = useState<Room|null>(null);

  useEffect(() => {
    function prepareClient() {
      const socket: GameSocket = GameSocket.get();

      console.log("Connected to Socket", socket);
    }

    if (!isClientPrepared.current) {
      prepareClient();

      rooms.push(new Room(1, "Test", "", new User(1, "Staff"), [], 10, 25, {cols: 1, rows: 1}));

      isClientPrepared.current = true;
    }
  }, []);

  function onRoomClick(room: Room) {
    setCurrentRoom(room);
    setIsHotelViewOpened(false);
  }

  return (
    <>
      <TopOptions
        canAccessRoomPreferences={true}

        onRoomPreferencesClick={() =>
          setIsRoomPreferencesWindowOpened(!isRoomPreferencesWindowOpened)}
      />

      <StaffTools
        canOpenModTools={true}
        canBeInvisible={true}
        canUseEffect={true}
      />

      {isHotelViewOpened &&
          <HotelView />}

      {!isHotelViewOpened && currentRoom &&
          <RoomViewContainer
            room={currentRoom}

            isRoomPreferencesWindowOpened={isRoomPreferencesWindowOpened}

            onRoomPreferencesClose={() => setIsRoomPreferencesWindowOpened(false)}
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
          rooms={rooms}

          onRoomClick={(room: Room) => onRoomClick(room)}
          onClose={closeRoomsNavigator}
        />}

      <NavigationBar
        isInHotelView={isHotelViewOpened}
        onHomeClick={onHomeClick}
        onHotelViewClick={onHotelViewClick}
        onRoomsNavigatorClick={onRoomsNavigatorClick}
      />
    </>
  );
};