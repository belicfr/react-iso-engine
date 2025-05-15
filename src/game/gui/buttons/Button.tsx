import {CSSProperties, FC, ReactNode} from "react";
import "./Button.css";
import {ThemeColor} from "../../../frameworks/types/Themes.ts";

export type ButtonProps = {
  className?: string,
  style?: CSSProperties,
  children: ReactNode,
  onClick?: (e) => void,

  color?: ThemeColor,

  disabled?: boolean,
};

export const Button: FC<ButtonProps> = props => {
  return (
    <>
      <button className={`button button-${props.color ?? "primary"} ${props.className}`}
              style={props.style}
              onClick={props.onClick}
              disabled={props.disabled}>

        {props.children}
      </button>
    </>
  );
};