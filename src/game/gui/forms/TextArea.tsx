import {FC} from "react";
import "./Control.css";
import {ControlProps} from "./ControlProps.ts";

type Props = ControlProps & {
  type?: string,
  placeholder?: string,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  rows?: number,
  cols?: number,

  resize?: CSSResize,
};

type CSSResize =
  "none"
  | "both"
  | "horizontal"
  | "vertical"
  | "inherit"
  | "initial"
  | "unset";

export const TextArea: FC<Props> = (
  {
    label, placeholder,
    minLength, maxLength,
    value, resize,
    rows, cols,

    onChange,
  }
) => {
  return (
    <>
      <label>
        <span className="label">
          {label}
        </span>

        <textarea
          className={
            "control"
            + (resize ? ` resize-${resize}` : "")
          }
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          rows={rows}
          cols={cols}
          value={value}

          onChange={onChange}
        />
      </label>
    </>
  );
};