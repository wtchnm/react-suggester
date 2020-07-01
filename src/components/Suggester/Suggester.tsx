import React, {
  ReactElement,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Input from "../Input";
import { Option } from "../../types";
import styles from "./Suggester.module.css";
import clsx from "clsx";

interface Props {
  options: Option[];

  label?: string;
  placeholder?: string;
  async?: true;
  loading?: boolean;
  min?: number;
  onSearch?(value: string): void;
  onSelect?(option: Option): void;
}

function Suggester({
  options,
  label,
  placeholder,
  async,
  loading,
  min = 3,
  onSearch,
  onSelect,
}: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [shouldBlur, setShouldBlur] = useState(true);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setOpen(true);

    if (async && onSearch && inputValue.length >= 3) {
      onSearch(inputValue);
    }
  }, []);

  const onFocus = useCallback(() => {
    setOpen(true);
  }, []);
  const onBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!shouldBlur) {
        event.preventDefault();
        event.target.focus();

        setShouldBlur(true);
        return;
      }

      setOpen(false);
    },
    [shouldBlur]
  );

  const onOptionMouseDown = useCallback(() => {
    setShouldBlur(false);
  }, []);
  const onOptionMouseUp = useCallback(
    (option: Option) => () => {
      setOpen(false);
      setShouldBlur(true);
      setValue(option.label);

      if (onSelect) {
        onSelect(option);
      }
    },
    []
  );

  const filteredOptions = useMemo(() => {
    const valueToMatch = value.toLowerCase();
    return options.filter((option) => {
      const label = option.label.toLowerCase();
      return label.indexOf(valueToMatch) === 0;
    });
  }, [options, value]);

  const getOptions = useCallback((): ReactElement | ReactElement[] => {
    if (async && value.length < min) {
      return (
        <li
          key={`Suggester__option-loading`}
          className="select-none text-gray-600 py-1 px-3"
          onMouseDown={onOptionMouseDown}
        >
          Enter at least {min} characters
        </li>
      );
    }

    if (async && loading) {
      return (
        <li
          key={`Suggester__option-loading`}
          className="select-none text-gray-600 py-1 px-3"
          onMouseDown={onOptionMouseDown}
        >
          Loading...
        </li>
      );
    }

    if (filteredOptions.length) {
      return filteredOptions.map((option, index) => (
        <li
          key={`Suggester__option-${index}`}
          className="cursor-pointer select-none hover:bg-gray-300 active:bg-gray-400 text-gray-600 py-1 px-3"
          onMouseDown={onOptionMouseDown}
          onMouseUp={onOptionMouseUp(option)}
        >
          {option.label}
        </li>
      ));
    }

    return (
      <li
        key={`Suggester__option-empty`}
        className="select-none text-gray-600 py-1 px-3"
        onMouseDown={onOptionMouseDown}
      >
        No suggestions
      </li>
    );
  }, [loading, value, filteredOptions]);

  return (
    <div>
      <Input
        ref={inputRef}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        onFocus={onFocus}
        onMouseDown={onFocus}
        onBlur={onBlur}
      />
      {open && (
        <ul
          className={clsx(
            "shadow-sm overflow-auto mt-1 bg-gray-200 w-full rounded py-2",
            styles["Suggester__options"]
          )}
        >
          {getOptions()}
        </ul>
      )}
    </div>
  );
}

export default Suggester;
