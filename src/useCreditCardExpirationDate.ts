import { useState } from "react";
import { expirationDate } from "card-validator";
import type { IHandleChangeFunc } from "./types";
import type { ICreditCardExpirationYearOptions } from "./useCreditCardExpirationYear";
import useReinitializer from "./useReinitializer";

export type ICreditCardExpirationDateOptions = ICreditCardExpirationYearOptions;
export type ICreditCardExpirationDateResult = ReturnType<typeof expirationDate>;

export function useCreditCardExpirationDate(
  value: string = "",
  options = {} as ICreditCardExpirationDateOptions
) {
  const { enableReinitialize, maxElapsedYear } = options;
  const [result, setResult] = useState({
    value,
  } as ICreditCardExpirationDateResult & { value: string });

  const handleChange: IHandleChangeFunc = (e) => {
    const value = typeof e === "string" ? e : e.currentTarget.value;
    const result = expirationDate(value, maxElapsedYear);
    setResult({ ...result, value });
  };

  useReinitializer(value, enableReinitialize, handleChange);

  return [result, handleChange] as const;
}

export default useCreditCardExpirationDate;
