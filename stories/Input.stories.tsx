import React, { ReactElement } from "react";
import Input from "../src/components/Input";

export default {
  title: "Input",
  component: Input,
};

export function Basic({
  label,
}: React.ComponentPropsWithRef<typeof Input>): ReactElement {
  return <Input label={label} />;
}
Basic.args = {
  label: "Name",
};
