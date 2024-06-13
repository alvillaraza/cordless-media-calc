// Form Elements
let form = document.getElementById('formCalc')
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

const principal = (loanAmountInput) => parseFloat(loanAmountInput.value);
const apy = (annualInterestRateInput) =>
  parseFloat(annualInterestRateInput.value);
const loanTerm = (loanTermInput) => parseInt(loanTermInput.value);

let paymentFreq1;
paymentFrequency1.addEventListener('change', function () {
  paymentFreq1 = this.value;
});
const numberOfPayments1 = () => {
  if (paymentFreq1 == 'Monthly') {
    return loanTerm(loanTerm1) * 12;
  } else if (paymentFreq1 == 'Bi-weekly') {
    return loanTerm(loanTerm1) * 24;
  } else if (paymentFreq1 == 'Weekly') {
    return loanTerm(loanTerm1) * 52;
  } else {
    return 'number of payments could not be calculated';
  }
};

let paymentFreq2;
paymentFrequency2.addEventListener('change', function () {
  paymentFreq2 = this.value;
});
const numberOfPayments2 = () => {
  if (paymentFreq2 == 'Monthly') {
    return loanTerm(loanTerm2) * 12;
  } else if (paymentFreq2 == 'Bi-weekly') {
    return loanTerm(loanTerm2) * 24;
  } else if (paymentFreq2 == 'Weekly') {
    return loanTerm(loanTerm2) * 52;
  } else {
    return 'number of payments could not be calculated';
  }
};

var options = { style: 'currency', currency: 'USD' };
var formatter = new Intl.NumberFormat('en-US', options);

btnCompare.addEventListener('click', function (e) {
  e.preventDefault();
  formCalc.checkValidity();
  formCalc.reportValidity();

  let monthlyPayment1;
  monthlyPayment1 = calculateMonthlyPayment(
    principal(loanAmount1),
    apy(annualInterestRate1),
    loanTerm(loanTerm1),
  );
  document.getElementById('monthlyPaymentAmountOne').innerHTML =
    formatter.format(monthlyPayment1);

  let monthlyPayment2;
  monthlyPayment2 = calculateMonthlyPayment(
    principal(loanAmount2),
    apy(annualInterestRate2),
    loanTerm(loanTerm2),
  );
  document.getElementById('monthlyPaymentAmountTwo').innerHTML =
    formatter.format(monthlyPayment2);

  let totalInterestPaid1;
  totalInterestPaid1 = calculateTotalInterest(
    principal(loanAmount1),
    apy(annualInterestRate1),
    numberOfPayments1(),
  );
  document.getElementById('totalInterestPaidOne').innerHTML =
    formatter.format(totalInterestPaid1);

  let totalInterestPaid2;
  totalInterestPaid2 = calculateTotalInterest(
    principal(loanAmount2),
    apy(annualInterestRate2),
    numberOfPayments2(),
  );
  document.getElementById('totalInterestPaidTwo').innerHTML =
    formatter.format(totalInterestPaid2);

  let totalCostOfLoan1;
  totalCostOfLoan1 = calculateTotalMortgageCost(
    principal(loanAmount1),
    apy(annualInterestRate1),
    loanTerm(loanTerm1),
  );
  document.getElementById('totalCostOfLoanOne').innerHTML =
    formatter.format(totalCostOfLoan1);

  let totalCostOfLoan2;
  totalCostOfLoan2 = calculateTotalMortgageCost(
    principal(loanAmount2),
    apy(annualInterestRate2),
    loanTerm(loanTerm2),
  );
  document.getElementById('totalCostOfLoanTwo').innerHTML =
    formatter.format(totalCostOfLoan2);

   if (formCalc.checkValidity()) {
  document.getElementById('results-section').classList.remove('d-none');
  }
});

function calculateMonthlyPayment(principal, annualInterestRate, years) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  const numberOfPayments = years * 12;

  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment.toFixed(2);
}

// TODO: I don't think this formula is correct, the number seems too big
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

  return totalInterest.toFixed(2);
}
function calculateTotalMortgageCost(
  loanAmount,
  annualInterestRate,
  loanTermYears,
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const totalPayments = loanTermYears * 12;

  const monthlyPayment =
    (loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments))) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  const totalCost = monthlyPayment * totalPayments;

  return totalCost.toFixed(2);
}

function calculateDifference(item1, item2) {
  const difference = item1 - item2;
  return difference.toFixed(2);
}
