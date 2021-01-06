import { useState } from "react";
import { cardholderName } from "card-validator";
import type { ICreditCardInitialOptions, IHandleChangeFunc } from "./types";
import useReinitializer from "./useReinitializer";

export type ICreditCardHolderNameOptions = ICreditCardInitialOptions;
export type ICreditCardCardHolderNameResult = ReturnType<typeof cardholderName>;

export function useCreditCardHolderName(
  value: string = "",
  options = {} as ICreditCardHolderNameOptions
) {
  const { enableReinitialize } = options;
  const [result, setResult] = useState({
    value,
  } as ICreditCardCardHolderNameResult & { value: string });

  const handleChange: IHandleChangeFunc = (e) => {
    const value = typeof e === "string" ? e : e.currentTarget.value;
    const result = cardholderName(value);
    setResult({ ...result, value });
  };

  useReinitializer(value, enableReinitialize, handleChange);

  return [result, handleChange] as const;
}

export default useCreditCardHolderName;
