import { useState } from "react";
import { number } from "card-validator";
import type { ICreditCardInitialOptions, IHandleChangeFunc } from "./types";
import useReinitializer from "./useReinitializer";
import prettyCreditCardNumber from "./prettyCreditCardNumber";

export type ICreditCardNumberOptions = ICreditCardInitialOptions &
  Exclude<Parameters<typeof number>[1], undefined>;

export type ICreditCardNumberResult = ReturnType<typeof number>;

export function useCreditCardNumber(
  value: string = "",
  options = {} as ICreditCardNumberOptions
) {
  const { enableReinitialize, ...others } = options;
  const [result, setResult] = useState({
    value,
  } as ICreditCardNumberResult & { value: string });

  const handleChange: IHandleChangeFunc = (e) => {
    const value = typeof e === "string" ? e : e.currentTarget.value;
    const result = number(value, others);
    const cardType = result?.card?.type;
    setResult({
      ...result,
      value: cardType ? prettyCreditCardNumber(value, cardType) : value,
    });
  };

  useReinitializer(value, enableReinitialize, handleChange);

  return [result, handleChange] as const;
}

export default useCreditCardNumber;
