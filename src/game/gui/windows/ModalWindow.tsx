import {FC} from "react";
import {WindowBaseProps, WindowInterface} from "./WindowInterface.tsx";

type Props = WindowBaseProps & {

};

export const ModalWindow: FC<Props> = props => {
  return (
    <>
      <div className="modal-window__container">
        <WindowInterface title={props.title}
                         width={props.width}
                         height={props.height}
                         onClose={props.onClose}>

          {props.children}
        </WindowInterface>
      </div>
    </>
  );
};