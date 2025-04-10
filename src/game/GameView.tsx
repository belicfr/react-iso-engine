import {FC, useEffect, useMemo, useRef, useState} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";
import {NavigationBar} from "./gui/navbar/NavigationBar.tsx";
import {TopOptions} from "./gui/top-options/TopOptions.tsx";
import {ModalWindow} from "./gui/windows/ModalWindow.tsx";
import {RoomsNavigatorWindow} from "./gui/windows/prefabs/rooms-navigator/RoomsNavigatorWindow.tsx";
import {StaffTools} from "./gui/staff-tools/StaffTools.tsx";
import GameSocket from "./room-view/engine/socket/GameSocket.ts";
import Room from "../models/Room.ts";
import User from "../models/User.ts";
import {RoomViewContainer} from "./room-view/components/room/RoomViewContainer.tsx";

export const GameView: FC = () => {
  const [ isHotelViewOpened, setIsHotelViewOpened ] = useState(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);
  const [ isRoomsNavigatorWindowOpened, setIsRoomsNavigatorWindowOpened ] = useState(false);

  const onHomeClick = () => setIsHotelViewOpened(false);
  const onHotelViewClick = () => setIsHotelViewOpened(true);
  const onRoomsNavigatorClick = () =>
    setIsRoomsNavigatorWindowOpened(!isRoomsNavigatorWindowOpened);

  const closeRoomsNavigator = () => setIsRoomsNavigatorWindowOpened(false);

  const isClientPrepared = useRef<boolean>(false);

  //TEMP
  const rooms = useMemo((): Room[] => [
    new Room(1, "Lounge", new User(1, "Staff"), [], 25, 0, {
      rows: 10, cols: 5,
    }),

    new Room(2, "Le Café", new User(1, "Staff"), [], 25, 0, {
      rows: 25, cols: 30,
    }),
  ], [])
  const [currentRoom, setCurrentRoom] = useState<Room|null>(null);

  useEffect(() => {
    function prepareClient() {
      const socket: GameSocket = GameSocket.get();

      console.log("Connected to Socket", socket);
    }

    if (!isClientPrepared.current) {
      prepareClient();
      isClientPrepared.current = true;
    }


  }, []);

  function onRoomClick(room: Room) {
    setCurrentRoom(room);
    setIsHotelViewOpened(false);
  }

  return (
    <>
      <TopOptions />

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