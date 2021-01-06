import { renderHook } from "@testing-library/react-hooks";
import useCreditCardExpirationDate from "./useCreditCardExpirationDate";
import { validCreditCard, invalidCreditCard, expected } from "./testUtils";

test.each`
  payload                             | expected
  ${invalidCreditCard.expirationDate} | ${expected(`is not within month range or behind the curren year. eg ${invalidCreditCard.expirationDate}`, false, false)}
  ${validCreditCard.expirationDate}   | ${expected("is within month range and ahead or equal to the current year", true)}
`(
  "$expected.behaviour when credit card date $expected.state",
  ({ payload, expected }) => {
    const { result } = renderHook(() => useCreditCardExpirationDate(payload));

    expect(result.current[0].isPotentiallyValid).toBe(
      expected.potentiallyValid
    );
    expect(result.current[0].isValid).toBe(expected.valid);
  }
);
