// function validateCreditCard(cardNumber) {
//     // Regular expression pattern to match common credit card formats (Visa, Mastercard, Dollar Account, Verve, and BTC)
//     const cardPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?           // Visa
//                         | 5[1-5][0-9]{14}                     // Mastercard
//                         | 3[47][0-9]{13}                      // Dollar Acount
//                         | 6(?:011|5[0-9]{2})[0-9]{12}        // Verve
//                         | 3(?:0[0-5]|[68][0-9])[0-9]{11})$/; // BTC

//     if (cardPattern.test(cardNumber)) {
//         return true;
//     } else {
//         return false;
//     }
// }

// const cardNumber1 = "4111111111111111"; // Visa
// const cardNumber2 = "5105105105105100"; // Mastercard
// const cardNumber3 = "378282246310005";  // Dollar Account
// const cardNumber4 = "6011111111111117"; // Verve
// const cardNumber5 = "30569309025904";    // BTC

// console.log("Is this Visa card valid?", validateCreditCard(cardNumber1));
// console.log("Is this Mastercard valid?", validateCreditCard(cardNumber2));
// console.log("Is this Dollar Account card valid?", validateCreditCard(cardNumber3));
// console.log("Is this Verve card valid?", validateCreditCard(cardNumber4));
// console.log("Is this BTC card valid?", validateCreditCard(cardNumber5));
