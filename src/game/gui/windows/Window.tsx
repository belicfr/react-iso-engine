import {FC, useEffect, useState} from "react";
import {WindowBaseProps, WindowInterface} from "./WindowInterface.tsx";
import {Rnd} from "react-rnd";
import {useZIndex} from "./WindowContext.tsx";

type Props = WindowBaseProps & {
  dragHandleClassName?: string,
};

export const Window: FC<Props> = props => {
  const { bringToFront } = useZIndex();
  const [ zIndex, setZIndex ] = useState<number>(0);

  useEffect(() => {
    setZIndex(bringToFront());
  }, []);

  const handleFocus = () => {
    setZIndex(bringToFront());
  };

  return (
    <>
      <Rnd
        style={{zIndex}}
        enableResizing={false}
        dragHandleClassName={props.dragHandleClassName ?? "window-interface__header"}
        onMouseDown={handleFocus}
      >

        <div className="window__container">
          <WindowInterface
            customHeaderClassName={props.customHeaderClassName}
            title={props.title}
            width={props.width}
            height={props.height}
            onClose={props.onClose}
          >

            {props.children}
          </WindowInterface>
        </div>
      </Rnd>
    </>
  );
};