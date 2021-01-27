import clsx from "clsx";
import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Option } from "../../types";
import Input from "../Input";
import styles from "./Suggester.module.css";

interface Properties {
  options: Option[];

  label: string;
  placeholder?: string;
  async?: true;
  loading?: boolean;
  min?: number;
  defaultOption?: Option;
  autoComplete?: string;
  onSearch?(value: string): void;
  onSelect?(option: Option): void;
  onClear?(): void;
}

function Suggester({
  options,
  label,
  placeholder,
  async,
  loading,
  min = 3,
  defaultOption,
  autoComplete,
  onSearch,
  onSelect,
  onClear,
}: Properties): ReactElement {
  const [value, setValue] = useState(defaultOption?.label ?? "");
  const [open, setOpen] = useState(false);
  const [shouldBlur, setShouldBlur] = useState(true);
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    defaultOption
  );
  const dropdownReference = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setHoveredOptionIndex(0);
  }, []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setValue(inputValue);
      setOpen(true);

      if (async && onSearch && inputValue.length >= 3) {
        onSearch(inputValue);
      }
    },
    [async, onSearch]
  );

  const filteredOptions = useMemo(() => {
    if (async) return options;

    const valueToMatch = value.toLowerCase();
    return options.filter((option) => {
      const labelToMatch = option.label.toLowerCase();
      return labelToMatch.indexOf(valueToMatch) === 0;
    });
  }, [async, options, value]);

  const onOptionMouseDown = useCallback(() => {
    setShouldBlur(false);
  }, []);
  const onOptionMouseUp = useCallback(
    (option: Option) => () => {
      closeDropdown();
      setSelectedOption(option);
      setShouldBlur(true);
      setValue(option.label);

      if (onSelect) {
        onSelect(option);
      }
    },
    [closeDropdown, onSelect]
  );

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

      if (selectedOption && value !== "") {
        onOptionMouseUp(selectedOption)();
      } else {
        setValue("");
        setShouldBlur(true);
        closeDropdown();
        if (onClear) {
          onClear();
        }
      }
    },
    [closeDropdown, onClear, onOptionMouseUp, selectedOption, shouldBlur, value]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.defaultPrevented || !dropdownReference.current) {
        return;
      }
      switch (event.key) {
        case "Down":
        case "ArrowDown": {
          event.preventDefault();
          if (hoveredOptionIndex === filteredOptions.length - 1) {
            setHoveredOptionIndex(0);
            dropdownReference.current.scrollTop = 0;
          } else {
            setHoveredOptionIndex(hoveredOptionIndex + 1);
            dropdownReference.current.scrollTop = hoveredOptionIndex * 32;
          }

          break;
        }
        case "Up":
        case "ArrowUp": {
          event.preventDefault();
          if (hoveredOptionIndex === 0) {
            setHoveredOptionIndex(filteredOptions.length - 1);
            dropdownReference.current.scrollTop =
              (filteredOptions.length - 1) * 32;
          } else {
            setHoveredOptionIndex(hoveredOptionIndex - 1);
            dropdownReference.current.scrollTop = (hoveredOptionIndex - 1) * 32;
          }

          break;
        }
        case "Enter":
          event.preventDefault();
          onOptionMouseUp(filteredOptions[hoveredOptionIndex])();
          break;
        case "Esc":
        case "Escape":
          event.preventDefault();
          closeDropdown();
          break;
        default:
      }
    },
    [onOptionMouseUp, filteredOptions, hoveredOptionIndex, closeDropdown]
  );

  const getOptions = useCallback((): ReactElement | ReactElement[] => {
    let optionText;
    if (async && loading) {
      optionText = "Loading...";
    } else if (async && value.length < min) {
      optionText = `Enter at least ${min} characters`;
    } else if (filteredOptions.length === 0) {
      optionText = "No suggestions";
    }

    if (optionText) {
      return (
        <button
          type="button"
          key="Suggester__option-loading"
          className="block w-full text-left select-none bg-white text-gray-700 py-1 px-3 border-none leading-normal text-base"
          onMouseDown={onOptionMouseDown}
        >
          {optionText}
        </button>
      );
    }

    return filteredOptions.map((option, index) => (
      <button
        type="button"
        key={`Suggester__option-${option.value}`}
        className={clsx(
          "block w-full text-left select-none bg-white text-gray-700 py-1 px-3 cursor-pointer active:bg-gray-300 border-none leading-normal text-base",
          {
            "hover:bg-gray-100": hoveredOptionIndex !== index,
            "bg-gray-200": hoveredOptionIndex === index,
          }
        )}
        onMouseDown={onOptionMouseDown}
        onMouseUp={onOptionMouseUp(option)}
      >
        {option.label}
      </button>
    ));
  }, [
    async,
    loading,
    value.length,
    min,
    filteredOptions,
    onOptionMouseDown,
    hoveredOptionIndex,
    onOptionMouseUp,
  ]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={onFocus}
        onMouseDown={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {open && (
        <div
          ref={dropdownReference}
          className={clsx(
            "z-50 absolute overflow-auto mt-1 border border-solid border-gray-300 shadow-sm w-full bg-white rounded py-2 box-border",
            styles.Suggester__options
          )}
        >
          {getOptions()}
        </div>
      )}
    </div>
  );
}

export default Suggester;
