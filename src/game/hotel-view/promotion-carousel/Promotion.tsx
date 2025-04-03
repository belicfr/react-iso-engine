import {FC} from "react";
import "./Promotion.css";
import PromotionArticle from "../../../models/PromotionArticle.ts";

interface Props {
  promotion: PromotionArticle;
}

export const Promotion: FC<Props> = props => {
  const cardStyles = {
    backgroundImage: `url("/src/assets/gamelib/promotionshvd/${props.promotion.banner}")`,
  };

  return (
    <>
      <div className="promotion-card" style={cardStyles}>
        <div className="promotion-card__label">
          <h4 className="promotion-card__title">
            {props.promotion.title}
          </h4>
        </div>
      </div>
    </>
  );
};