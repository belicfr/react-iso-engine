import {FC, ReactNode} from "react";
import "./TabColumn.css";

type Props = {
  title: string,
  children: ReactNode,
};

export const TabColumn: FC<Props> = ({title, children}) => {
  return (
    <>
      <section className="room-preferences__tab-column">
        <h6 className="col-title">
          {title}
        </h6>

        {children}
      </section>
    </>
  );
};