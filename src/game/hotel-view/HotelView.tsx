import {FC} from "react";
import "./HotelView.css";
import {PromotionCarousel} from "./promotion-carousel/PromotionCarousel.tsx";

type Props = object;

export const HotelView: FC<Props> = props => {
  return (
    <>
      <div className="hotel-view__container">
        <div className="hotel-view__content">
          <h1 className="welcome-title">
            Welcome!
          </h1>

          <PromotionCarousel />
        </div>

        <div className="asset-building"></div>
      </div>
    </>
  );
};