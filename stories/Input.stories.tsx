import React, { ReactElement, useState, useCallback } from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Input from "../src/components/Input";

export default {
  title: "Input",
  decorators: [withKnobs],
};

export function Default(): ReactElement {
  const label = text("Label", "Name");
  const placeholder = text("Placeholder", "John Doe");

  return (
    <div className="p-4 max-w-md box-border">
      <Input label={label} placeholder={placeholder} />
    </div>
  );
}

export function Controlled(): ReactElement {
  const label = text("Label", "Name");
  const placeholder = text("Placeholder", "John Doe");
  const [value, setValue] = useState("");

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return (
    <div className="p-4 max-w-md box-border">
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
