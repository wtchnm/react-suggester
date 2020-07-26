import React, { useCallback, useState, ReactElement } from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import Suggester from "../src/components/Suggester/Suggester";
import { Option } from "../src/types";

export default {
  title: "Suggester",
  decorators: [withKnobs],
};

const DEFAULT_OPTIONS: Option[] = [
  {
    label: "Aaren",
    value: 1,
  },
  {
    label: "Aarika",
    value: 2,
  },
  {
    label: "Abagael",
    value: 3,
  },
  {
    label: "Abagail",
    value: 4,
  },
  {
    label: "Abbe",
    value: 5,
  },
  {
    label: "Abbey",
    value: 6,
  },
  {
    label: "Abbi",
    value: 7,
  },
  {
    label: "Abbie",
    value: 8,
  },
  {
    label: "Abby",
    value: 9,
  },
  {
    label: "Abbye",
    value: 10,
  },
];

export function Sync(): ReactElement {
  const label = text("Label", "Name");
  const placeholder = text("Placeholder", "John Doe");
  const options = object("Options", DEFAULT_OPTIONS);

  return (
    <div className="p-4 max-w-md box-border">
      <Suggester label={label} placeholder={placeholder} options={options} />
    </div>
  );
}

export function Async(): ReactElement {
  const label = text("Label", "Name");
  const placeholder = text("Placeholder", "John Doe");
  const defaultOptions = object("Options", DEFAULT_OPTIONS);

  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = useCallback(
    (value: string) => {
      setLoading(true);
      setTimeout(() => {
        const valueToMatch = value.toLowerCase();
        const filteredOptions = defaultOptions.filter((option) => {
          const labelToMatch = option.label.toLowerCase();
          return labelToMatch.indexOf(valueToMatch) === 0;
        });

        setOptions(filteredOptions);
        setLoading(false);
      }, 500);
    },
    [defaultOptions]
  );

  return (
    <div className="p-4 max-w-md box-border">
      <Suggester
        async
        loading={loading}
        label={label}
        placeholder={placeholder}
        options={options}
        onSearch={onSearch}
      />
    </div>
  );
}
