import { useState } from "react";
import { expirationYear } from "card-validator";
import type { ICreditCardInitialOptions, IHandleChangeFunc } from "./types";
import useReinitializer from "./useReinitializer";

export type ICreditCardExpirationYearOptions = ICreditCardInitialOptions & {
  maxElapsedYear?: number;
};
export type ICreditCardExpirationYearResult = ReturnType<typeof expirationYear>;

export function useCreditCardExpirationYear(
  value: string = "",
  options = {} as ICreditCardExpirationYearOptions
) {
  const { enableReinitialize, maxElapsedYear } = options;
  const [result, setResult] = useState({
    value,
  } as ICreditCardExpirationYearResult & { value: string });

  const handleChange: IHandleChangeFunc = (e) => {
    const value = typeof e === "string" ? e : e.currentTarget.value;
    const result = expirationYear(value, maxElapsedYear);
    setResult({ ...result, value });
  };

  useReinitializer(value, enableReinitialize, handleChange);

  return [result, handleChange] as const;
}

export default useCreditCardExpirationYear;
