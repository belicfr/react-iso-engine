import {FC} from "react";
import "./HotelView.css";
import {PromotionCarousel} from "./promotion-carousel/PromotionCarousel.tsx";
import {NavigationBar} from "../gui/navbar/NavigationBar.tsx";
import {TopOptions} from "../gui/top-options/TopOptions.tsx";

type Props = object;

export const HotelView: FC<Props> = props => {
  return (
    <>
      <div className="hotel-view__container">
        <div className="hotel-view__content">
          <TopOptions />

          <h1 className="welcome-title">
            Welcome!
          </h1>

          <PromotionCarousel />

          <NavigationBar />
        </div>

        <div className="asset-building"></div>
      </div>
    </>
  );
};