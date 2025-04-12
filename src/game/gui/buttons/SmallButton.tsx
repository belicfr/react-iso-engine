import {FC} from "react";
import "./Button.css";
import {ButtonProps} from "./Button.tsx";

export const SmallButton: FC<ButtonProps> = props => {
  return (
    <>
      <button className={`small-button button-${props.color ?? "primary"} ${props.className}`}
              style={props.style}
              onClick={props.onClick}>

        {props.children}
      </button>
    </>
  );
};