import {FC, useEffect, useRef, useState} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";
import {NavigationBar} from "./gui/navbar/NavigationBar.tsx";
import {TopOptions} from "./gui/top-options/TopOptions.tsx";
import {ModalWindow} from "./gui/windows/ModalWindow.tsx";
import {RoomsNavigatorWindow} from "./gui/windows/prefabs/rooms-navigator/RoomsNavigatorWindow.tsx";
import {StaffTools} from "./gui/staff-tools/StaffTools.tsx";
import {RoomView} from "./room-view/RoomView.tsx";
import GameSocket from "./room-view/engine/socket/GameSocket.ts";

type Props = object;

export const GameView: FC<Props> = props => {
  const [ isHotelViewOpened, setIsHotelViewOpened ] = useState(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);
  const [ isRoomsNavigatorWindowOpened, setIsRoomsNavigatorWindowOpened ] = useState(false);

  const onHomeClick = () => setIsHotelViewOpened(false);
  const onHotelViewClick = () => setIsHotelViewOpened(true);
  const onRoomsNavigatorClick = () =>
    setIsRoomsNavigatorWindowOpened(!isRoomsNavigatorWindowOpened);

  const closeRoomsNavigator = () => setIsRoomsNavigatorWindowOpened(false);

  const isClientPrepared = useRef<boolean>(false);

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

      {!isHotelViewOpened &&
          <RoomView
          />}

      {isWelcomeWindowOpened &&
          <ModalWindow title="Welcome"
                       width="auto"
                       height="auto"
                       onClose={() => setIsWelcomeWindowOpened(false)}>

              <p style={{margin: "20px"}}>
                  Welcome to this Demo.
                  This engine is under development.
              </p>
          </ModalWindow>}

      {isRoomsNavigatorWindowOpened &&
        <RoomsNavigatorWindow
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