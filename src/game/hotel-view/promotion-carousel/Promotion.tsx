import {FC} from "react";
import "./Promotion.css";
import {PublicPromotionDto} from "../../../models/dto/public/PublicPromotionDto.ts";
import {PromotionAction} from "../../../frameworks/types/Actions.ts";

type Props = {
  promotion: PublicPromotionDto,

  onClick: PromotionAction,
}

export const Promotion: FC<Props> = ({promotion, onClick}) => {
  const cardStyles = {
    backgroundImage: `url("/src/assets/gamelib/promotionshvd/${promotion.thumbnailPath}")`,
  };

  return (
    <>
      <div
        className="promotion-card"
        style={cardStyles}

        onClick={onClick}
      >

        <div className="promotion-card__label">
          <h4 className="promotion-card__title">
            {promotion.title}
          </h4>
        </div>
      </div>
    </>
  );
};