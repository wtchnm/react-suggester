import React, { ReactElement } from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Input from "../src/components/Input";

export default {
  title: "Input",
  decorators: [withKnobs],
};

export function Default(): ReactElement {
  return (
    <div className="p-4 max-w-md">
      <Input />
    </div>
  );
}

export function WithLabelAndPlaceholder(): ReactElement {
  const label = text("Label", "Name");
  const placeholder = text("Placeholder", "John Doe");

  return (
    <div className="p-4 max-w-md">
      <Input label={label} placeholder={placeholder} />
    </div>
  );
}
