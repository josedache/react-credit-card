import { useState } from "react";
import { postalCode } from "card-validator";
import type { ICreditCardInitialOptions, IHandleChangeFunc } from "./types";
import useReinitializer from "./useReinitializer";

export type ICreditCardPostalCodeResult = ReturnType<typeof postalCode>;

export type ICreditCardPostalCodeOptions = ICreditCardInitialOptions &
  Exclude<Parameters<typeof postalCode>[1], undefined>;

export function useCreditCardPostalCode(
  value?: string,
  options = {} as ICreditCardPostalCodeOptions
) {
  const { enableReinitialize, ...others } = options;

  const [result, setResult] = useState({
    value,
  } as ICreditCardPostalCodeResult & { value: string });

  const handleChange: IHandleChangeFunc = (e) => {
    const value = typeof e === "string" ? e : e.currentTarget.value;
    const result = postalCode(value, others);
    setResult({ ...result, value });
  };

  useReinitializer(value, enableReinitialize, handleChange);

  return [result, handleChange] as const;
}

export default useCreditCardPostalCode;
