import {FC, useEffect, useState} from "react";
import "./Promotion.css";
import {Promotion} from "./Promotion.tsx";
import {PublicPromotionDto} from "../../../models/dto/public/PublicPromotionDto.ts";
import {getAllPromotions} from "../../../io/promotion/PromotionIO.ts";
import {useAlerts} from "../../gui/windows/AlertsContext.tsx";

export const PromotionCarousel: FC = () => {
  const [ promotions, setPromotions ] = useState<PublicPromotionDto[]>([]);
  const [ currentPromoIndex, setcurrentPromoIndex ] = useState(0);

  const {addAlert} = useAlerts();

  useEffect(() => {
    getAllPromotions()
      .then(r => r.json())
      .then(setPromotions)
      .catch(err => console.error("Promotions Retrieving ERROR", err));
  }, []);

  return (
    <>
      <div className="promotion-carousel">
        <div className="promotion__current">
          {!!promotions.length &&
            <Promotion
                promotion={promotions[currentPromoIndex]}

                onClick={() => addAlert({
                  id: Math.random(),
                  title: "[DEBUG] Promotion Action",
                  content: promotions[currentPromoIndex].action,
                })}
            />}
        </div>

        <div className="carousel-navigation">
          {promotions.map((_, index) =>
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