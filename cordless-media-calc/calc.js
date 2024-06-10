import {
  FormatNum, // format a number by adding commas as thousand separators.
  monthlyPayment, // calculate the monthly payment for a loan or mortgage based on the principal amount (p), the number of monthly payments (n), and the monthly interest rate (i).
  getTermLengthForLoanType, // determine the loan term length (in years) based on the type of loan specified (loanType).
  usdFormatterPoints, // format numbers into a string representation using the US English locale ('en-US') with specific formatting options.
  usdFormatter, // format numbers into a string representation using the US English locale ('en-US') with specific formatting options.
  usdFormatterNoDec, // ensures that your application can present currency amounts in a clear and consistent format, tailored to specific display requirements where decimal precision is not needed or desired.
  cmTrimNum, // trim or round a number (num) to a specified number of decimal places, using a specified rounding method (rounding).
  getRates, // fetch mortgage rates data from a remote API endpoint using jQuery's $.ajax method.
} from './common.js';

var initalized = false;

// Form Elements
let downPayment1 = document.getElementById('downPayment1');
let loanAmount1 = document.getElementById('loanAmount1');
let loanTerm1 = document.getElementById('loanTerm1');
let annualInterestRate1 = document.getElementById('annualInterestRate1');
let loanType1 = document.getElementById('loanType1');
let rate1 = document.getElementById('rate1');
let paymentFrequency1 = document.getElementById('paymentFrequency1');
let downPayment2 = document.getElementById('downPayment2');
let loanAmount2 = document.getElementById('loanAmount2');
let loanTerm2 = document.getElementById('loanTerm2');
let annualInterestRate2 = document.getElementById('annualInterestRate2');
let loanType2 = document.getElementById('loanType2');
let rate2 = document.getElementById('rate2');
let paymentFrequency2 = document.getElementById('paymentFrequency2');

let btnCompare = document.getElementById('compareLoansButton');

btnCompare.addEventListener('click', function () {
  // TODO: Monthly Payment is returning NaN

  let loanOne = loanOneValues();

  console.log(
    'monthlyPayment',
    monthlyPayment(
      loanOne.loanAmountValue,
      (loanOne.loanAmountValue / loanOne.loanTermValue) * 12,
      loanOne.rateValue
    )
  );
});

function loanOneValues() {
  return {
    downPayment: parseInt(
      downPayment1.value ? downPayment1.value : (downPayment1.value = 0)
    ),
    loanAmountValue: parseInt(
      loanAmount1.value ? loanAmount1.value : (loanAmount1.value = 0)
    ),
    loanTermValue: parseInt(
      loanTerm1.value ? loanTerm1.value : (loanTerm1.value = 0)
    ),
    annualInterestRateValue: parseInt(
      annualInterestRate1.value
        ? annualInterestRate1.value
        : (annualInterestRate1.value = 0)
    ),
    loanTypeValue:
      loanType1.value !== 'What type of loan is this?'
        ? loanType1.value
        : (loanType1.value = 'Fixed'),
    rateValue: parseInt(rate1.value ? rate1.value : (rate1.value = 0)),
    paymentFrequencyValue:
      paymentFrequency1.value !== 'How often are your payments?'
        ? paymentFrequency1.value
        : (paymentFrequency1.value = 'Monthly'),
  };
}

// Init
// export function compareCalcInit() {
//   console.log('hello');
// }

// compareCalcInit();
