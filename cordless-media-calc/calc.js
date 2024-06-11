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

const principal = parseInt(loanAmount1.value);
const apy = parseInt(annualInterestRate1.value);
const loanTerm = parseInt(loanTerm1.value);

// todo; need to figure out why i can't select the 2nd option
let paymentFrequency;
paymentFrequency1.addEventListener('change', function () {
  paymentFrequency = this.value;
});

const numberOfPayments = () => {
  if (paymentFrequency == 'Monthly') {
   return loanTerm * 12;
  } else if (paymentFrequency == 'Bi-weekly') {
    return loanTerm * 24;
  } else if (paymentFrequency == 'Weekly') {
    return loanTerm * 52;
  } else {
    return ('number of payments could not be calculated');
  }
};

btnCompare.addEventListener('click', function () {

  console.log(
    'monthly payment',
    calculateMonthlyPayment(principal, apy, loanTerm),
  );

  console.log('total interest', calculateTotalInterest(principal, apy, numberOfPayments()));
});

function calculateMonthlyPayment(principal, annualInterestRate, years) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  const numberOfPayments = years * 12;

  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}

function calculateTotalInterest(
  principal,
  annualInterestRate,
  numberOfPayments,
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  const totalPayment = monthlyPayment * numberOfPayments;

  const totalInterest = totalPayment - principal;

  return totalInterest;
}
