import {FC, ReactNode} from "react";
import {CloseButton} from "./components/CloseButton.tsx";
import "./Window.css";

export type WindowBaseProps = {
  children: ReactNode,

  title: string,
  width: string,
  height: string,

  onClose: () => void,
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

        <header className="window-interface__header">
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