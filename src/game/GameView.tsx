import {FC, useState} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";
import {NavigationBar} from "./gui/navbar/NavigationBar.tsx";
import {TopOptions} from "./gui/top-options/TopOptions.tsx";
import {ModalWindow} from "./gui/windows/ModalWindow.tsx";

type Props = object;

export const GameView: FC<Props> = props => {
  const [isHotelViewOpened, setIsHotelViewOpened] = useState(true);

  const [ isWelcomeWindowOpened, setIsWelcomeWindowOpened ] = useState(true);

  const onHomeClick = () => setIsHotelViewOpened(!isHotelViewOpened);

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

      <NavigationBar onHomeClick={onHomeClick} />
    </>
  );
};