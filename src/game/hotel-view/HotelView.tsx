import {FC} from "react";
import "./HotelView.css";
import {PromotionCarousel} from "./promotion-carousel/PromotionCarousel.tsx";

export const HotelView: FC = () => {
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