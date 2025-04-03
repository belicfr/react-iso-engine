import {FC} from "react";
import "./Icon.css";

type Props = {
  x: number,
  y: number,
  size: string,
};

export const Icon: FC<Props> = props => {
  const styles = {
    width: props.size,
    height: props.size,

    backgroundPosition: `${props.x}px ${props.y}px`,
  };

  return (
    <>
    <div className="gui-icon"
         style={styles}></div>
    </>
  );
};