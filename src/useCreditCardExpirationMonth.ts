import { useState } from "react";
import { expirationMonth } from "card-validator";
import type { ICreditCardInitialOptions, IHandleChangeFunc } from "./types";
import useReinitializer from "./useReinitializer";

export type ICreditCardExpirationMonthOptions = ICreditCardInitialOptions;
export type ICreditCardExpirationMonthResult = ReturnType<
  typeof expirationMonth
>;

export function useCreditCardExpirationMonth(
  value: string = "",
  options = {} as ICreditCardExpirationMonthOptions
) {
  const { enableReinitialize } = options;
  const [result, setResult] = useState({
    value,
  } as ICreditCardExpirationMonthResult & { value: string });

  const handleChange: IHandleChangeFunc = (e) => {
    const value = typeof e === "string" ? e : e.currentTarget.value;
    const result = expirationMonth(value);
    setResult({ ...result, value });
  };

  useReinitializer(value, enableReinitialize, handleChange);

  return [result, handleChange] as const;
}

export default useCreditCardExpirationMonth;
