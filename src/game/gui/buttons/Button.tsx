import {CSSProperties, FC, ReactNode} from "react";
import "./Button.css";

export type ButtonProps = {
  className?: string,
  style?: CSSProperties,
  children: ReactNode,
  onClick?: () => void,

  color?: string,
};

export const Button: FC<ButtonProps> = props => {
  return (
    <>
      <button className={`button button-${props.color ?? "primary"} ${props.className}`}
              style={props.style}
              onClick={props.onClick}>

        {props.children}
      </button>
    </>
  );
};