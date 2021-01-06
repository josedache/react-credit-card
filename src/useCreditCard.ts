import useCreditCardNumber from "./useCreditCardNumber";
import type { ICreditCardNumberOptions } from "./useCreditCardNumber";
import useCreditCardExpirationDate from "./useCreditCardExpirationDate";
import useCreditCardCVV from "./useCreditCardCVV";

export interface ICreditCardOptions {
  enableReinitialize?: boolean;
  luhnValidateUnionPay?: ICreditCardNumberOptions["luhnValidateUnionPay"];
  numberMaxLength?: ICreditCardNumberOptions["maxLength"];
  maxElapsedYear?: number;
  postalCodeMinLength?: number;
  cvvMaxLength?: number;
}

export function useCreditCard(
  value: {
    number?: string;
    expirationDate?: string;
    cvv?: string;
  } = {},
  options = {} as ICreditCardOptions
) {
  const {
    enableReinitialize,
    luhnValidateUnionPay,
    numberMaxLength,
    maxElapsedYear,
    cvvMaxLength,
  } = options;

  const [
    { value: number, card, ...numberValidations },
    handleNumber,
  ] = useCreditCardNumber(value.number, {
    enableReinitialize,
    luhnValidateUnionPay,
    maxLength: numberMaxLength,
  });

  const [
    {
      value: expirationDate,
      month: expirationMonth,
      year: expirationYear,
      ...dateValidations
    },
    handleExpirationDate,
  ] = useCreditCardExpirationDate(value.expirationDate, {
    enableReinitialize,
    maxElapsedYear,
  });

  const [{ value: cvv, ...cvvValidations }, handleCVV] = useCreditCardCVV(
    value.cvv,
    {
      maxLength: cvvMaxLength,
    }
  );

  const isPotentiallyValid =
    numberValidations.isPotentiallyValid ||
    dateValidations.isPotentiallyValid ||
    cvvValidations.isPotentiallyValid;

  const isValid =
    numberValidations.isValid &&
    dateValidations.isValid &&
    cvvValidations.isValid;

  return {
    values: {
      number,
      expirationDate,
      expirationMonth,
      expirationYear,
      cvv,
    },
    isPotentiallyValid,
    isValid,
    card,
    handleNumber,
    handleExpirationDate,
    handleCVV,
  } as const;
}

export default useCreditCard;
