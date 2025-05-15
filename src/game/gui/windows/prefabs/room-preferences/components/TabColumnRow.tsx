import {FC, ReactNode} from "react";
import "./TabColumnRow.css";
import {Action} from "../../../../../../frameworks/types/Actions.ts";

type Props = {
  children: ReactNode,

  onClick?: Action,
};

export const TabColumnRow: FC<Props> = ({children, onClick}) => {
  return (
    <>
      <div
        className="tab-column__row"

        onClick={onClick}
      >

        {children}
      </div>
    </>
  );
};