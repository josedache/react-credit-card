import { renderHook } from "@testing-library/react-hooks";
import useCreditCard from "./useCreditCard";
import { validCreditCard, invalidCreditCard, expected } from "./testUtils";

test.each`
  payload              | expected
  ${validCreditCard}   | ${expected("is valid", true)}
  ${invalidCreditCard} | ${expected("is invalid", false)}
`(
  `$expected.behaviour when credit card $expected.state`,
  ({ payload, expected }) => {
    const { result } = renderHook(() => useCreditCard(payload));

    expect(result.current.isPotentiallyValid).toBe(expected.potentiallyValid);
    expect(result.current.isValid).toBe(expected.valid);
  }
);
