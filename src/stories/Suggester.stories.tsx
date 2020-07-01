import React, { useCallback, useState } from "react";
import Suggester from "../components/Suggester/Suggester";
import { Option } from "../types";

export default {
  title: "Suggester",
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

export function Sync() {
  return (
    <div className="p-4 max-w-md">
      <Suggester
        label="Patient name"
        placeholder="John Doe"
        options={DEFAULT_OPTIONS}
      />
    </div>
  );
}

export function Async() {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = useCallback((value: string) => {
    setLoading(true);
    setTimeout(() => {
      const valueToMatch = value.toLowerCase();
      const filteredOptions = DEFAULT_OPTIONS.filter((option) => {
        const label = option.label.toLowerCase();
        return label.indexOf(valueToMatch) === 0;
      });

      setOptions(filteredOptions);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-4 max-w-md">
      <Suggester
        async
        loading={loading}
        label="Patient name"
        placeholder="John Doe"
        options={options}
        onSearch={onSearch}
      />
    </div>
  );
}
