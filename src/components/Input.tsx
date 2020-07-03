import React, { useMemo } from "react";
import nanoid from "../utils/nanoid";

interface Props {
  value?: string | number;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;

  label?: string;
  placeholder?: string;

  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onMouseDown?(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
}

function Input({
  value,
  onChange,
  label,
  placeholder,
  onFocus,
  onMouseDown,
  onBlur,
}: Props) {
  const componentId = useMemo(() => "Input-" + nanoid(), []);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          className="text-gray-600 font-bold mb-1 pr-4"
          htmlFor={componentId}
        >
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={onChange}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
        id={componentId}
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        onBlur={onBlur}
      />
    </div>
  );
}

export default Input;
