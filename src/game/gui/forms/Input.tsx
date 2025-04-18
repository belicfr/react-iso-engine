import {forwardRef} from "react";
import "./Control.css";
import {ControlProps} from "./ControlProps.ts";

type Props = ControlProps & {
  type?: string,
  placeholder?: string,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label, type, placeholder,
      min, max, minLength,
      maxLength, value,

      onChange, onBlur,
    },
    ref
  ) => {
    return (
      <>
        <label>
          <span className="label">
            {label}
          </span>

          <input
            ref={ref}
            className="control"
            type={type ?? "text"}
            placeholder={placeholder}
            min={min}
            max={max}
            minLength={minLength}
            maxLength={maxLength}
            value={value}

            onChange={onChange}
            onBlur={onBlur}
          />
        </label>
      </>
    );
  }
);