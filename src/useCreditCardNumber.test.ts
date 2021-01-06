import { renderHook } from "@testing-library/react-hooks";
import useCreditCardNumber from "./useCreditCardNumber";
import { validCreditCard, invalidCreditCard, expected } from "./testUtils";

test.each`
  payload                     | expected
  ${""}                       | ${expected("is empty", false)}
  ${"1233X"}                  | ${expected("contains character", false, false)}
  ${validCreditCard.number}   | ${expected("is valid", true)}
  ${invalidCreditCard.number} | ${expected("is invalid", false)}
`(
  `$expected.behaviour when credit card number $expected.state`,
  ({ payload, expected }) => {
    const { result } = renderHook(() => useCreditCardNumber(payload));

    expect(result.current[0].isPotentiallyValid).toBe(
      expected.potentiallyValid
    );
    expect(result.current[0].isValid).toBe(expected.valid);
  }
);
