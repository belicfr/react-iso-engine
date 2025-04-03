import {CSSProperties, FC, ReactNode} from "react";
import "./Button.css";

export type ButtonProps = {
  className?: string,
  style?: CSSProperties,
  children: ReactNode,

  color?: string,
};

export const Button: FC<ButtonProps> = props => {
  return (
    <>
      <button className={`button button-${props.color ?? "primary"} ${props.className}`}
              style={props.style}>

        {props.children}
      </button>
    </>
  );
};