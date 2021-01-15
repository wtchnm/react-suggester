import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Suggester from "../src/components/Suggester/Suggester";
import { Option } from "../src/types";

export default {
  title: "Suggester",
  component: Suggester,
};

const DEFAULT_OPTIONS: Option[] = [
  {
    label: "James",
    value: 1,
  },
  {
    label: "Robert",
    value: 2,
  },
  {
    label: "Michael",
    value: 3,
  },
];

export function Basic(): ReactElement {
  return (
    <Suggester label="Name" options={DEFAULT_OPTIONS} autoComplete="off" />
  );
}

const defaultOption = DEFAULT_OPTIONS[0];
export function Async(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const onSearch = useCallback((value: string) => {
    setLoading(true);
    setTimeout(() => {
      const valueToMatch = value.toLowerCase();
      const filteredOptions = DEFAULT_OPTIONS.filter(
        (option) => option.label.toLowerCase().indexOf(valueToMatch) === 0
      );

      setLoading(false);
      setOptions(filteredOptions);
    }, 300);
  }, []);

  useEffect(() => {
    onSearch(defaultOption.label);
  }, [onSearch]);

  return (
    <Suggester
      label="Name"
      async
      loading={loading}
      options={options}
      onSearch={onSearch}
      defaultOption={defaultOption}
    />
  );
}
