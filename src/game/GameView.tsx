import {FC} from "react";
import {HotelView} from "./hotel-view/HotelView.tsx";

type Props = object;

export const GameView: FC<Props> = props => {
  return (
    <>
      <HotelView />
    </>
  );
};