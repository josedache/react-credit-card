import type { FormEvent } from "react";
export interface ICreditCardInitialOptions {
  enableReinitialize?: boolean;
}

export interface IHandleChangeFunc {
  (arg: FormEvent<HTMLInputElement & {value: string}> | string): void;
}
