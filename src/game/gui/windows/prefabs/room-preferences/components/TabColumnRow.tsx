import {FC, ReactNode} from "react";
import "./TabColumnRow.css";

type Props = {
  children: ReactNode,

  onClick?: () => void,
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