import {FC, useState} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";
import {NavigationBar} from "./gui/navbar/NavigationBar.tsx";
import {TopOptions} from "./gui/top-options/TopOptions.tsx";

type Props = object;

export const GameView: FC<Props> = props => {
  const [isHotelViewOpened, setIsHotelViewOpened] = useState(true);

  return (
    <>
      <TopOptions />

      {isHotelViewOpened &&
        <HotelView />}

      <NavigationBar onHomeClick={
        () => setIsHotelViewOpened(!isHotelViewOpened)} />
    </>
  );
};