import React, { useMemo, ReactElement } from "react";
import { nanoid } from "nanoid/non-secure";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({
  label,

  ...rest
}: Props): ReactElement {
  const componentId = useMemo(() => `Input-${nanoid()}`, []);

  return (
    <div className="flex flex-col">
      <label htmlFor={componentId} className="text-gray-700 leading-normal">
        {label}
      </label>
      <input
        type="text"
        id={componentId}
        className="mt-1 box-border w-full py-2 px-3 rounded border border-solid border-gray-400 bg-white text-base leading-normal placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-400"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </div>
  );
}

export default Input;
