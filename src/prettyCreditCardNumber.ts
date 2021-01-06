import { creditCardType } from "card-validator";

export function prettyCreditCardNumber(cardNumber: string, cardType: string) {
  var card = creditCardType.getTypeInfo(cardType);
  const trimmedNumber = cardNumber.replace(/\s/g, "");

  if (card) {
    var offsets = ([] as number[]).concat(0, card.gaps, trimmedNumber.length);
    var components = [];

    for (var i = 0; offsets[i] < trimmedNumber.length; i++) {
      var start = offsets[i];
      var end = Math.min(offsets[i + 1], trimmedNumber.length);
      components.push(trimmedNumber.substring(start, end));
    }

    return components.join(" ");
  }

  return trimmedNumber;
}

export default prettyCreditCardNumber;
