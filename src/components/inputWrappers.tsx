import {
  Tabs as NUITabs,
  Input as NUIInput,
  Select as NUISelect,
} from "@nextui-org/react";
import { ComponentProps, Key } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

// type TabsProps = {
//   register?: UseFormRegisterReturn;
// } & ComponentProps<typeof NUITabs>;

// export function Tabs({
//   register,
//   ...props
// }: TabsProps): JSX.Element {
//   return (
//     <NUITabs
//       selectedKey={register?.value}
//       // onSelectionChange={(key) => onChange(key)}
//       {...props}
//     >
//       {props.children}
//     </NUITabs>
//   );
// }

type InputProps = {
  error?: string;
} & ComponentProps<typeof NUIInput>;

export function Input({
  error,
  value,
  color,
  ...props
}: InputProps): JSX.Element {
  return (
    <NUIInput
      errorMessage={error}
      value={value ? value : ""}
      color={error ? "danger" : color}
      {...props}
    />
  );
}
