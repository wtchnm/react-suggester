import React, { useMemo, ReactElement } from "react";
import nanoid from "../utils/nanoid";

interface Props {
  value?: string | number;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;

  label: string;
  placeholder?: string;

  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  onMouseDown?(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

function Input({
  value,
  onChange,

  label,
  placeholder,

  onFocus,
  onBlur,
  onMouseDown,
  onKeyDown,
}: Props): ReactElement {
  const componentId = useMemo(() => `Input-${nanoid()}`, []);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={componentId}
        className="text-gray-700 mb-1 pr-4 leading-normal"
      >
        {label}
      </label>
      <input
        type="text"
        id={componentId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="appearance-none bg-white border border-solid border-gray-400 rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline focus:border-blue-400 leading-normal box-border text-base placeholder-gray-500"
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Input;
