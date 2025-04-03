import {FC, useState} from "react";
import "./Promotion.css";
import {Promotion} from "./Promotion.tsx";
import PromotionArticle from "../../../models/PromotionArticle.ts";

type Props = object;

export const PromotionCarousel: FC<Props> = props => {
  const STUB_PROMO: PromotionArticle[] = [
    new PromotionArticle("New City Pack", "prom_zzz_1.png"),
    new PromotionArticle("New City Pack #2", "prom_zzz_1.png"),
  ];

  const [ currentPromoIndex, setcurrentPromoIndex ] = useState(0);

  return (
    <>
      <div className="promotion-carousel">
        <div className="promotion__current">
          {STUB_PROMO.length &&
            <Promotion promotion={STUB_PROMO[currentPromoIndex]} />}
        </div>

        <div className="carousel-navigation">
          {STUB_PROMO.map((_, index) =>
            <div key={index}
                 className={
                   "carousel-navigation__dot-button" +
                   (currentPromoIndex === index
                     ? " active"
                     : "")
                 }
                 onClick={() => setcurrentPromoIndex(index)}></div>)}
        </div>
      </div>
    </>
  );
};