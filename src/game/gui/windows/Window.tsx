import {FC} from "react";
import {WindowBaseProps, WindowInterface} from "./WindowInterface.tsx";
import {Rnd} from "react-rnd";

type Props = WindowBaseProps & {

};

export const Window: FC<Props> = props => {
  return (
    <>
      <Rnd enableResizing={false} dragHandleClassName="window-interface__header">
        <div className="window__container">
          <WindowInterface title={props.title}
                           width={props.width}
                           height={props.height}
                           onClose={props.onClose}>

            {props.children}
          </WindowInterface>
        </div>
      </Rnd>
    </>
  );
};