import React from "react";
import Input from "../components/Input";

export default {
  title: "Input",
};

export function WithLabel() {
  return (
    <div className="p-4 max-w-md">
      <Input label="Patient name" placeholder="John Doe" />
    </div>
  );
}

export function WithoutLabel() {
  return (
    <div className="p-4 max-w-md">
      <Input placeholder="John Doe" />
    </div>
  );
}
