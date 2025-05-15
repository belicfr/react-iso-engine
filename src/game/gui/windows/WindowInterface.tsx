import {FC, ReactNode} from "react";
import {CloseButton} from "./components/CloseButton.tsx";
import "./Window.css";
import {Action} from "../../../frameworks/types/Actions.ts";

export type WindowBaseProps = {
  children: ReactNode,

  title: string,
  width: string,
  height: string,
  customHeaderClassName?: string,

  onClose: Action,
};

export const WindowInterface: FC<WindowBaseProps> = props => {
  const styles = {
    width: props.width,
    height: props.height,
  };

  return (
    <>
      <div className="window-interface"
           style={styles}>

        <header className={
          "window-interface__header"
          + ` ${props.customHeaderClassName ?? ""}`
        }>

          <h6>
            {props.title}
          </h6>

          <div className="close-button__container">

            <CloseButton onClick={props.onClose} />
          </div>
        </header>

        {props.children}
      </div>
    </>
  );
};