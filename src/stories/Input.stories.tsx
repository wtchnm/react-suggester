import React from "react";
import Input from "../components/Input";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Input",
  decorators: [withKnobs],
};

export function Default() {
  return (
    <div className="p-4 max-w-md">
      <Input />
    </div>
  );
}

export function WithLabelAndPlaceholder() {
  const label = text("Label", "Name");
  const placeholder = text("Placeholder", "John Doe");

  return (
    <div className="p-4 max-w-md">
      <Input label={label} placeholder={placeholder} />
    </div>
  );
}
