import React, { useMemo, ReactElement } from "react";
import nanoid from "../utils/nanoid";

interface Props {
  value?: string | number;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;

  label: string;
  placeholder?: string;

  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onMouseDown?(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

function Input({
  value,
  onChange,
  label,
  placeholder,
  onFocus,
  onMouseDown,
  onBlur,
  onKeyDown,
}: Props): ReactElement {
  const componentId = useMemo(() => `Input-${nanoid()}`, []);

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-gray-700 mb-1 pr-4" htmlFor={componentId}>
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={onChange}
        className="appearance-none bg-white border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline focus:border-blue-400"
        id={componentId}
        type="text"
        placeholder={placeholder}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Input;
