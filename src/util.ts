import type { ClassValue } from "clsx";
import clsx from "clsx";
import type { LucideProps } from "lucide-react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

export type Override<
  Type,
  NewType extends { [key in keyof Type]?: NewType[key] },
> = Omit<Type, keyof NewType> & NewType;

export type Icon = FC<Omit<LucideProps, "ref">>;

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

function titleCase(str: string): string {
  return str
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    );
}

export function enumToSelectItem<T extends string>(
  enumObj: Record<string, T>,
): { label: string; value: T }[] {
  return Object.values(enumObj).map((value) => ({
    label: titleCase(value),
    value,
  }));
}

export function shortDayName(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, { weekday: "short" });
}
