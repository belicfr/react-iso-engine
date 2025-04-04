import {FC, useState} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";
import {NavigationBar} from "./gui/navbar/NavigationBar.tsx";
import {TopOptions} from "./gui/top-options/TopOptions.tsx";
import {ModalWindow} from "./gui/windows/ModalWindow.tsx";
import {RoomsNavigatorWindow} from "./gui/windows/prefabs/rooms-navigator/RoomsNavigatorWindow.tsx";

type Props = object;

export const GameView: FC<Props> = props => {
  const [isHotelViewOpened, setIsHotelViewOpened] = useState(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);
  const [ isRoomsNavigatorWindowOpened, setIsRoomsNavigatorWindowOpened ] = useState(false);

  const onHomeClick = () => setIsHotelViewOpened(false);
  const onHotelViewClick = () => setIsHotelViewOpened(true);
  const onRoomsNavigatorClick = () =>
    setIsRoomsNavigatorWindowOpened(!isRoomsNavigatorWindowOpened);

  const closeRoomsNavigator = () => setIsRoomsNavigatorWindowOpened(false);

  return (
    <>
      <TopOptions />

      {isHotelViewOpened &&
          <HotelView />}

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