import {ChangeEvent, FC} from "react";
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

  onInput?: (content: string) => void,
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

    onChange, onBlur, onInput,
  }
) => {
  function inputEvent(e: ChangeEvent<HTMLTextAreaElement>) {
    if (onInput) {
      onInput(e.target.value);
    }

    if (onChange) {
      onChange(e);
    }
  }
  
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

          onChange={inputEvent}
          onBlur={onBlur}
        />
      </label>
    </>
  );
};