import {FC} from "react";
import "./TopOptions.css";
import {CrownsIcon} from "../../../frameworks/icons/CrownsIcon.tsx";
import {SmallButton} from "../buttons/SmallButton.tsx";

type Props = object;

export const TopOptions: FC<Props> = props => {
  return (
    <>
      <div className="top-options__container">
        <div className="top-options__currencies">
          <div className="top-options__credits">
            <CrownsIcon size="20px" />
            100
          </div>
        </div>

        <div className="top-options__separator"></div>

        <div className="top-options__actions">
          <SmallButton>
            Help
          </SmallButton>

          <SmallButton color="secondary">
            Options
          </SmallButton>
        </div>
      </div>
    </>
  );
};