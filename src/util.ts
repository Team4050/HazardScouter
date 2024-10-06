import type { IconProps } from "@tabler/icons-react";
import type { ClassValue } from "clsx";
import clsx from "clsx";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

export type Override<
  Type,
  NewType extends { [key in keyof Type]?: NewType[key] },
> = Omit<Type, keyof NewType> & NewType;

export type Icon = FC<Omit<IconProps, "ref">>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
