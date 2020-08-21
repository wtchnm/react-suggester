import React from "react";
import useAutoId from "../utils/useAutoId";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,

      ...rest
    },
    ref
  ) => {
    const id = useAutoId("Input");

    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-gray-700 leading-normal">
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          id={id}
          className="mt-1 box-border w-full py-2 px-3 rounded border border-solid border-gray-400 text-base leading-normal placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-400"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
