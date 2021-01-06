import { renderHook } from "@testing-library/react-hooks";
import useCreditCardHolderName from "./useCreditCardHolderName";
import { validCreditCard, invalidCreditCard, expected } from "./testUtils";

// ${`${validCreditCard.name}`} | ${expected("greater than 255", false)}
test.each`
  payload                   | expected
  ${invalidCreditCard.name} | ${expected(`is card like. eg ${invalidCreditCard.name}`, false)}
  ${validCreditCard.name}   | ${expected(`is not card like. eg ${validCreditCard.name}`, true)}
`(
  "$expected.behaviour when card holder name $expected.state",
  ({ payload, expected }) => {
    const { result } = renderHook(() => useCreditCardHolderName(payload));

    expect(result.current[0].isPotentiallyValid).toBe(
      expected.potentiallyValid
    );
    expect(result.current[0].isValid).toBe(expected.valid);
  }
);
