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
import RoomTemplate, {RoomTemplateRepository} from "../models/RoomTemplate.ts";

export const GameView: FC = () => {
  const [ isHotelViewOpened, setIsHotelViewOpened ] = useState(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);
  const [ isRoomsNavigatorWindowOpened, setIsRoomsNavigatorWindowOpened ] = useState(false);
  const [ isRoomPreferencesWindowOpened, setIsRoomPreferencesWindowOpened ] = useState<boolean>(false);

  const onHomeClick = () => setIsHotelViewOpened(false);
  const onHotelViewClick = () => {
    setCurrentRoom(null);
    setIsHotelViewOpened(true);
  };
  const onRoomsNavigatorClick = () =>
    setIsRoomsNavigatorWindowOpened(!isRoomsNavigatorWindowOpened);

  const closeRoomsNavigator = () => setIsRoomsNavigatorWindowOpened(false);

  const isClientPrepared = useRef<boolean>(false);

  //TEMP
  const rooms: Room[] = RoomRepository.i().rooms;
  const [currentRoom, setCurrentRoom] = useState<Room|null>(null);

  const roomTemplates: RoomTemplate[] = RoomTemplateRepository.i().templates;

  const user: User = SessionRepository.i().user;

  useEffect(() => {
    function prepareClient() {
      const socket: GameSocket = GameSocket.get();

      console.log("Connected to Socket", socket);
    }

    if (!isClientPrepared.current) {
      prepareClient();
      const templateDev = new RoomTemplate(1, `
000000000000000000000000000000000000
000000000000000000000000000000000000
011111111000000000000000000000000000
011111111000000000000000000000000000
011111111000000000000000000000000000
011111111000000000000000000000000000
011111111000000000000000000000000000
011111111000000000000000000000000000
011111111000000111111111100000000000
011111111000000111111111100000000000
011111111000000111111111100000000000
011111111000000111111111100000000000
011111111000000111111111100000000000
011111111000000111111111100000000000
000000000000000111111111100000000000
000000000000000111111111100000000000
000000000000000111111111100000000000
000000000000000111111111100000000000
000001000000000111111111100000000000
000000000000000111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000011111111111111111100000000000
000000000000000111000000000000000000
000000000000000111000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000001000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
000000000000000000000000000000000000
        `.trim(), "DEV");

      roomTemplates.push(new RoomTemplate(1, `
0000000000000000000000000000000000000
0000000000000000000000000000000000000
0000000000000000000000000000000000000
0000000000000000000000000000000000000
0000000000000000000000000000000000000
0000000000000000000000000000000000000
0000000000011000000000000000000000000
0000000000111100000000000000000000000
0000000001111110000000001111111111000
0000000011111111000000011111111111000
0000000111111111100000111111111111000
0000000111111111111001111111111111000
0000000011111111111111111111111111000
0000000001111111111111111111111111000
0000000000111111111111111111111111000
0000000000011111111111111111111111000
0000000000001111111111111111111111000
0000000000001111111111111111111111000
0000000000001111111111111111111111000
0000000000001111111111111111111111000
0000000000001111111111111111111111000
0000000000011111111111111111111110000
0000000000111111111111111111111100000
0000000001111111111111111111111000000
0000000001111111111111111111110000000
0000000001111111111111111111100000000
0000000001111111111111111111000000000
0000000001111111111111111110000000000
0000000001111111111111111100000000000
0000100001111111111111111000000000000
0000000001111111111111110000000000000
0000000001111111111111100000000000000
0000000001111111111111000000000000000
0000000000000000000000000000000000000
0000000000000000000000000000000000000
        `.trim(), "Theater"));

      roomTemplates.push(templateDev);

      const demoRoom = new Room(1, "Test", "", UserRepository.i().findById(1)!, [], 10, 25,
        templateDev);
      demoRoom.bannedUsers.push(UserRepository.i().findById(2)!);
      demoRoom.havingRightsUsers.push(UserRepository.i().findById(2)!);

      rooms.push(demoRoom);

      SessionRepository.i().user.friends.push(UserRepository.i().findById(1));

      isClientPrepared.current = true;
    }
  }, []);

  function onRoomClick(room: Room) {
    setCurrentRoom(room);
    setIsHotelViewOpened(false);
    setIsRoomsNavigatorWindowOpened(false);
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
              room={currentRoom}
              user={null}

              canOpenModTools={user.permissions.canUseModTools}
              canBeInvisible={user.permissions.canBeInvisible}
              canUseEffect={user.permissions.canUseStaffEffect}
          />}

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