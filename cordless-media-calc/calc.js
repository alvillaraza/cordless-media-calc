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
let btnAll = document.getElementById('allButton');
let btnMonthly = document.getElementById('monthlyButton');
let btnInterest = document.getElementById('interestButton');
let btnCost = document.getElementById('costButton');

const principal = (loanAmountInput) => parseFloat(loanAmountInput.value);

const apy = (annualInterestRateInput) =>
  parseFloat(annualInterestRateInput.value);
const monthlyInterestRate = (annualInterestRateInput) => {
  return apy(annualInterestRateInput) / 100 / 12;
};

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

  let monthlyPayment1,
    monthlyPayment2,
    totalInterestPaid1,
    totalInterestPaid2,
    totalCostOfLoan1,
    totalCostOfLoan2;

  monthlyPayment1 = monthlyPayment(
    principal(loanAmount1),
    numberOfPayments1(),
    monthlyInterestRate(annualInterestRate1),
  );

  document.getElementById('monthlyPaymentAmountOne').innerHTML =
    formatter.format(monthlyPayment1);

  monthlyPayment2 = monthlyPayment(
    principal(loanAmount2),
    numberOfPayments2(),
    monthlyInterestRate(annualInterestRate2),
  );

  document.getElementById('monthlyPaymentAmountTwo').innerHTML =
    formatter.format(monthlyPayment2);

  totalInterestPaid1 = calculateTotalInterest(
    principal(loanAmount1),
    apy(annualInterestRate1),
    numberOfPayments1(),
  );
  document.getElementById('totalInterestPaidOne').innerHTML =
    formatter.format(totalInterestPaid1);

  totalInterestPaid2 = calculateTotalInterest(
    principal(loanAmount2),
    apy(annualInterestRate2),
    numberOfPayments2(),
  );
  document.getElementById('totalInterestPaidTwo').innerHTML =
    formatter.format(totalInterestPaid2);

  totalCostOfLoan1 = calculateTotalMortgageCost(
    principal(loanAmount1),
    apy(annualInterestRate1),
    loanTerm(loanTerm1),
  );
  document.getElementById('totalCostOfLoanOne').innerHTML =
    formatter.format(totalCostOfLoan1);

  totalCostOfLoan2 = calculateTotalMortgageCost(
    principal(loanAmount2),
    apy(annualInterestRate2),
    loanTerm(loanTerm2),
  );
  console.log(totalCostOfLoan1);

  document.getElementById('totalCostOfLoanTwo').innerHTML =
    formatter.format(totalCostOfLoan2);

  const monthlyDiff = calculateDifference(monthlyPayment1, monthlyPayment2);
  document.getElementById('monthlyDifference').innerHTML =
    formatter.format(monthlyDiff);

  const interestPaidDiff = calculateDifference(
    totalInterestPaid1,
    totalInterestPaid2,
  );

  document.getElementById('totalInterestPaidDiff').innerHTML =
    formatter.format(interestPaidDiff);

  const totalCostOfLoanDiff = calculateDifference(
    totalCostOfLoan1,
    totalCostOfLoan2,
  );

  document.getElementById('totalCostOfLoanDiff').innerHTML =
    formatter.format(totalCostOfLoanDiff);

  if (formCalc.checkValidity()) {
    document.getElementById('results-section').classList.remove('d-none');
  }

  // Chart
  // Chart
  // Chart
  const monthChart = document.getElementById('monthlyChartJS');
  let monthlyChart = null;

  const intChart = document.getElementById('interestChartJS');
  let interestChart;

  const costChart = document.getElementById('loanCostChartJS');
  let loanCostChart;

  generateChart();
  function generateChart() {
    console.log('monthly', monthlyChart);
    if (monthlyChart) {
      monthlyChart.destroy();
    }

    monthlyChart = new Chart(monthChart, {
      type: 'bar',
      data: {
        labels: [
          `Loan 1 - ${formatter.format(monthlyPayment1)}`,
          `Loan 2 - ${formatter.format(monthlyPayment2)}`,
        ],
        datasets: [
          {
            label: 'Monthly Payment',
            data: [monthlyPayment1, monthlyPayment2],
            backgroundColor: ['#206fff', '#08b7ff'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                weight: 'bold',
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    if (interestChart) {
      interestChart.destroy();
    }

    interestChart = new Chart(intChart, {
      type: 'bar',
      data: {
        labels: [
          `Total Interest Paid 1 - ${formatter.format(totalInterestPaid1)}`,
          `Total Interest Paid 2 - ${formatter.format(totalInterestPaid2)}`,
        ],
        datasets: [
          {
            label: 'Total Interest Paid',
            data: [totalInterestPaid1, totalInterestPaid2],
            backgroundColor: ['#206fff', '#08b7ff'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                weight: 'bold',
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    if (loanCostChart) {
      loanCostChart.destroy();
    }

    loanCostChart = new Chart(costChart, {
      type: 'bar',
      data: {
        labels: [
          `Loan 1 - ${formatter.format(totalCostOfLoan1)}`,
          `Loan 2 - ${formatter.format(totalCostOfLoan2)}`,
        ],
        datasets: [
          {
            label: 'Total Cost of Loan',
            data: [totalCostOfLoan1, totalCostOfLoan2],
            backgroundColor: ['#206fff', '#08b7ff'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              font: {
                weight: 'bold',
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});

// TODO need to figuer out toggling of this
// TODO Canvas is already in use. Chart with ID '0' must be destroyed before the canvas with ID 'monthlyChartJS' can be reused.

btnMonthly.addEventListener('click', function (e) {
  // e.preventDefault();
  document.getElementById('monthlyChartJS').classList.add('d-block');
  document.getElementById('interestChartJS').classList.add('d-none');
  document.getElementById('loanCostChartJS').classList.add('d-none');
});

btnInterest.addEventListener('click', function (e) {
  // e.preventDefault();
  document.getElementById('monthlyChartJS').classList.add('d-none');
  document.getElementById('interestChartJS').classList.add('d-block');
  document.getElementById('loanCostChartJS').classList.add('d-none');
});

btnCost.addEventListener('click', function (e) {
  // e.preventDefault();
  document.getElementById('monthlyChartJS').classList.add('d-none');
  document.getElementById('interestChartJS').classList.add('d-none');
  document.getElementById('loanCostChartJS').classList.add('d-block');
});

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

function monthlyPayment(p, n, i) {
  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}
