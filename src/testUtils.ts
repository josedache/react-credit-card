export const validCreditCard = {
  name: "Edache Joseph",
  number: "4084084084084081",
  expirationDate: "10/22",
  cvv: "408",
};

export const invalidCreditCard = {
  name: "123455-1",
  number: "4084",
  expirationDate: "40/22",
  cvv: "606",
};

export function expected(
  state: string,
  valid: boolean = false,
  potentiallyValid: boolean = true
) {
  return {
    state,
    potentiallyValid,
    valid,
    behaviour: `should validate to be ${
      potentiallyValid ? "" : "not"
    } potentiallyValid and ${valid ? "" : "not "}valid`,
  };
}

function removeWhiteSpaces(value: string = "") {
  return value.replace(/\s/g, "");
}
