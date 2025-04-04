import {FC, useEffect, useState} from "react";
import {WindowBaseProps, WindowInterface} from "./WindowInterface.tsx";
import {useZIndex} from "./WindowContext.tsx";

type Props = WindowBaseProps & {

};

export const ModalWindow: FC<Props> = props => {
  const { bringToFront } = useZIndex();
  const [ zIndex, setZIndex ] = useState(0);

  useEffect(() => {
    setZIndex(bringToFront());
  }, []);

  return (
    <>
      <div className="modal-window__container"
           style={{zIndex}}>

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