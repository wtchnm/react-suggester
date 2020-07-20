import React, {
  ReactElement,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Input from "../Input";
import { Option } from "../../types";
import clsx from "clsx";

import styles from "./Suggester.module.css";

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
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [shouldBlur, setShouldBlur] = useState(true);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setSelectedOptionIndex(0);
  }, []);

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

      closeDropdown();
    },
    [shouldBlur]
  );

  const onOptionMouseDown = useCallback(() => {
    setShouldBlur(false);
  }, []);
  const onOptionMouseUp = useCallback(
    (option: Option) => () => {
      closeDropdown();
      setShouldBlur(true);
      setValue(option.label);

      if (onSelect) {
        onSelect(option);
      }
    },
    []
  );

  const filteredOptions = useMemo(() => {
    if (async) return options;

    const valueToMatch = value.toLowerCase();
    return options.filter((option) => {
      const label = option.label.toLowerCase();
      return label.indexOf(valueToMatch) === 0;
    });
  }, [options, value]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.defaultPrevented || !dropdownRef.current) {
        return;
      }
      switch (event.key) {
        case "Down":
        case "ArrowDown": {
          event.preventDefault();
          if (selectedOptionIndex === filteredOptions.length - 1) {
            setSelectedOptionIndex(0);
            dropdownRef.current.scrollTop = 0;
          } else {
            setSelectedOptionIndex(selectedOptionIndex + 1);
            dropdownRef.current.scrollTop = selectedOptionIndex * 32;
          }

          break;
        }
        case "Up":
        case "ArrowUp": {
          event.preventDefault();
          if (selectedOptionIndex === 0) {
            setSelectedOptionIndex(filteredOptions.length - 1);
            dropdownRef.current.scrollTop = (filteredOptions.length - 1) * 32;
          } else {
            setSelectedOptionIndex(selectedOptionIndex - 1);
            dropdownRef.current.scrollTop = (selectedOptionIndex - 1) * 32;
          }

          break;
        }
        case "Enter":
          event.preventDefault();
          onOptionMouseUp(filteredOptions[selectedOptionIndex])();
          break;
        case "Esc":
        case "Escape":
          event.preventDefault();
          closeDropdown();
          break;
        default:
          return;
      }
    },
    [selectedOptionIndex, filteredOptions, dropdownRef]
  );

  const getOptions = useCallback((): ReactElement | ReactElement[] => {
    if (async) {
      let optionText;
      if (loading) {
        optionText = "Loading...";
      } else if (value.length < min) {
        optionText = `Enter at least ${min} characters`;
      } else if (!filteredOptions.length) {
        optionText = "No suggestions";
      }

      if (optionText) {
        return (
          <li
            key={`Suggester__option-loading`}
            className="select-none text-gray-600 py-1 px-3"
            onMouseDown={onOptionMouseDown}
          >
            {optionText}
          </li>
        );
      }
    }

    return filteredOptions.map((option, index) => (
      <li
        key={`Suggester__option-${index}`}
        className={clsx(
          "select-none text-gray-600 py-1 px-3",
          "cursor-pointer active:bg-gray-400",
          {
            "hover:bg-gray-300": selectedOptionIndex !== index,
            "bg-gray-400": selectedOptionIndex === index,
          }
        )}
        onMouseDown={onOptionMouseDown}
        onMouseUp={onOptionMouseUp(option)}
      >
        {option.label}
      </li>
    ));
  }, [loading, value, filteredOptions, selectedOptionIndex]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        onFocus={onFocus}
        onMouseDown={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul
          ref={dropdownRef}
          className={`z-50 absolute shadow-sm overflow-auto mt-1 bg-gray-200 w-full rounded py-2 ${styles["Suggester__options"]}`}
        >
          {getOptions()}
        </ul>
      )}
    </div>
  );
}

export default Suggester;
