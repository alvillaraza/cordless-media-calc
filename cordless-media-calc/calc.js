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
  const principal = parseInt(loanAmount1.value);
  const apy = parseInt(annualInterestRate1.value);
  const loanTerm = parseInt(loanTerm1.value);

  console.log(
    'monthly payment',
    calculateMonthlyPayment(principal, apy, loanTerm),
  );
});

function calculateMonthlyPayment(principal, annualInterestRate, years) {
  // Convert the annual interest rate to a monthly rate
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // Calculate the number of monthly payments
  const numberOfPayments = years * 12;

  // Calculate the monthly payment using the formula
  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}
