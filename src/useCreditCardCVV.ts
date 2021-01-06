import { useState } from "react";
import { cvv } from "card-validator";
import type { ICreditCardInitialOptions, IHandleChangeFunc } from "./types";
import useReinitializer from "./useReinitializer";

export type ICreditCardCVVOptions = ICreditCardInitialOptions & {
  maxLength?: number | number[];
};
export type ICreditCardCVVResult = ReturnType<typeof cvv>;

export function useCreditCardCVV(
  value: string = "",
  options = {} as ICreditCardCVVOptions
) {
  const { enableReinitialize, maxLength } = options;
  const [result, setResult] = useState({
    value,
  } as ICreditCardCVVResult & { value: string });

  const handleChange: IHandleChangeFunc = (e) => {
    const value = typeof e === "string" ? e : e.currentTarget.value;
    const result = cvv(value, maxLength);
    setResult({ ...result, value });
  };

  useReinitializer(value, enableReinitialize, handleChange);

  return [result, handleChange] as const;
}

export default useCreditCardCVV;
