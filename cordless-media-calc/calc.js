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

const downPayment = (downPaymentInput) =>
  parseFloat(downPaymentInput.value) || 30000;
const principal = (loanAmountInput) =>
  parseFloat(loanAmountInput.value) || 400000;
const loanTerm = (loanTermInput) => parseInt(loanTermInput.value) || 15;
const apy = (annualInterestRateInput) =>
  parseFloat(annualInterestRateInput.value) || 7.25;
const loanType = (loanTypeInput) => loanTypeInput.value;

const monthlyInterestRate = (annualInterestRateInput) => {
  return apy(annualInterestRateInput) / 100 / 12;
};

let paymentFreq1;
paymentFrequency1.addEventListener('change', function () {
  paymentFreq1 = this.value;
});

// const paymentsPerYear = (paymentFrequency) => {
//   console.log(paymentFrequency)
//   let result;
//   switch (paymentFrequency.toLowerCase()) {
//     case 'monthly':
//       return result = 12;

//       break;

//     case 'bi-weekly':
//       return result = 26;

//       break;

//     case 'weekly':
//      return result = 52;

//       break;

//     default:
//       console.log(
//         "Invalid payment frequency. Use 'monthly', 'bi-weekly', or 'weekly'.",
//       );
//   }
// };

// TODO 1: this function is found in many places here, make it reusable and only use 1 function
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
    totalCostOfLoan2,
    monthlyDiff,
    interestPaidDiff,
    totalCostOfLoanDiff;

  monthlyPayment1 = monthlyPayment(
    principal(loanAmount1),
    numberOfPayments1(), // TODO 1: this result needs to be the total number of payments over the life of the loan(180 vs 12)
    monthlyInterestRate(annualInterestRate1),
  );

  monthlyPayment2 = monthlyPayment(
    principal(loanAmount2),
    numberOfPayments2(),
    monthlyInterestRate(annualInterestRate2),
  );

  totalInterestPaid1 = calculateTotalInterestPaid(
    downPayment(downPayment1),
    principal(loanAmount1),
    loanTerm(loanTerm1),
    apy(annualInterestRate1),
    paymentFreq1,
  );

  totalInterestPaid2 = calculateTotalInterestPaid(
    downPayment(downPayment2),
    principal(loanAmount2),
    loanTerm(loanTerm2),
    apy(annualInterestRate2),
    paymentFreq2,
  );

  totalCostOfLoan1 = calculateTotalMortgageCost(
    principal(loanAmount1),
    apy(annualInterestRate1),
    loanTerm(loanTerm1),
    loanType(loanType1),
    paymentFreq1,
  );

  console.log(
    principal(loanAmount1),
    apy(annualInterestRate1),
    loanTerm(loanTerm1),
    loanType(loanType1),
  );

  totalCostOfLoan2 = calculateTotalMortgageCost(
    principal(loanAmount2),
    apy(annualInterestRate2),
    loanTerm(loanTerm2),
    loanType(loanType2),
    paymentFreq2,
  );

  monthlyDiff = calculateDifference(monthlyPayment1, monthlyPayment2);
  document.getElementById('monthlyDifference').innerHTML =
    formatter.format(monthlyDiff);

  interestPaidDiff = calculateDifference(
    totalInterestPaid1,
    totalInterestPaid2,
  );

  totalCostOfLoanDiff = calculateDifference(totalCostOfLoan1, totalCostOfLoan2);

  document.getElementById('monthlyPaymentAmountOne').innerHTML =
    formatter.format(monthlyPayment1);
  document.getElementById('monthlyPaymentAmountTwo').innerHTML =
    formatter.format(monthlyPayment2);
  document.getElementById('totalInterestPaidOne').innerHTML =
    formatter.format(totalInterestPaid1);
  document.getElementById('totalInterestPaidTwo').innerHTML =
    formatter.format(totalInterestPaid2);
  document.getElementById('totalCostOfLoanOne').innerHTML =
    formatter.format(totalCostOfLoan1);
  document.getElementById('totalCostOfLoanTwo').innerHTML =
    formatter.format(totalCostOfLoan2);
  document.getElementById('totalInterestPaidDiff').innerHTML =
    formatter.format(interestPaidDiff);
  document.getElementById('totalCostOfLoanDiff').innerHTML =
    formatter.format(totalCostOfLoanDiff);

  if (formCalc.checkValidity()) {
    document.getElementById('results-section').classList.remove('d-none');
  }

  // Chart
  // Chart
  // Chart
  let monthlyChart;
  let interestChart;
  let loanCostChart;

  let chartStatusMonthly = Chart.getChart('monthlyChartJS');
  let chartStatusInterest = Chart.getChart('interestChartJS');
  let chartStatusCost = Chart.getChart('loanCostChartJS');

  const monthChart = document.getElementById('monthlyChartJS');
  const intChart = document.getElementById('interestChartJS');
  const costChart = document.getElementById('loanCostChartJS');

  function generateChart() {
    if (chartStatusMonthly != undefined) {
      chartStatusMonthly.destroy();
    }
    if (chartStatusInterest != undefined) {
      chartStatusInterest.destroy();
    }
    if (chartStatusCost != undefined) {
      chartStatusCost.destroy();
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
            borderRadius: 15,
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
            borderRadius: 15,
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
            borderRadius: 15,
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

  generateChart();
});

$('#show-all').on('click', function () {
  console.log('clicked all');
  $(this)
    .addClass('active')
    .parent('li')
    .siblings()
    .find('a')
    .removeClass('active');
  $('.tab-pane').removeClass('fade').addClass('active').addClass('show');
});

$('#pills-tab a')
  .not('#show-all')
  .on('click', function (e) {
    console.log('clicked pills');
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).tab('show').addClass('active');
  });

function calculateTotalFixedMortgageCost(
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

function monthlyPayment(p, n, i) {
  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

function calculateTotalInterestPaid(
  downPayment,
  loanAmount,
  loanTerm,
  interestRate,
  paymentFrequency,
) {
  const principal = loanAmount - downPayment;

  const annualInterestRate = interestRate / 100;

  let paymentsPerYear;

  switch (paymentFrequency.toLowerCase()) {
    case 'monthly':
      paymentsPerYear = 12;

      break;

    case 'bi-weekly':
      paymentsPerYear = 26;

      break;

    case 'weekly':
      paymentsPerYear = 52;

      break;

    default:
      console.log(
        "Invalid payment frequency. Use 'monthly', 'bi-weekly', or 'weekly'.",
      );
  }

  const totalPayments = loanTerm * paymentsPerYear;

  const periodicInterestRate = annualInterestRate / paymentsPerYear;

  const monthlyPayment =
    (principal * periodicInterestRate) /
    (1 - Math.pow(1 + periodicInterestRate, -totalPayments));

  const totalAmountPaid = monthlyPayment * totalPayments;

  const totalInterestPaid = totalAmountPaid - principal;

  return totalInterestPaid;
}

function calculateFixedRateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const n = years * 12;
  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}

function calculateRemainingBalance(principal, annualRate, years, paymentsMade) {
  const monthlyRate = annualRate / 12 / 100;
  const n = years * 12;
  return (
    (principal *
      (Math.pow(1 + monthlyRate, n) -
        Math.pow(1 + monthlyRate, paymentsMade))) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}

function calculateAdjustedRate(
  initialRate,
  indexRate,
  margin,
  caps,
  indexRateRise,
  yearsElapsed,
) {
  let newAnnualRate = initialRate;

  for (let i = 1; i <= yearsElapsed; i++) {
    const newIndexRate = indexRate + indexRateRise * i;
    let adjustedRate = newIndexRate + margin;

    if (adjustedRate - initialRate > caps.period) {
      adjustedRate = initialRate + caps.period;
    }

    if (adjustedRate - initialRate > caps.lifetime) {
      adjustedRate = initialRate + caps.lifetime;
    }

    newAnnualRate = adjustedRate;
  }

  return newAnnualRate;
}

function calculateTotalAdjustableRateMortgageCost(
  principal,
  initialRate,
  totalYears,
  paymentFrequency,
) {
  const fixedYears = 5;
  const indexRate = 1;
  const margin = 2;
  const caps = { period: 2, lifetime: 5 };
  const indexRateRise = 0.5;
  let paymentsPerYear;

  switch (paymentFrequency.toLowerCase()) {
    case 'monthly':
      paymentsPerYear = 12;

      break;

    case 'bi-weekly':
      paymentsPerYear = 26;

      break;

    case 'weekly':
      paymentsPerYear = 52;

      break;

    default:
      console.log(
        "Invalid payment frequency. Use 'monthly', 'bi-weekly', or 'weekly'.",
      );
  }

  const fixedRateMonthlyPayment = calculateFixedRateMonthlyPayment(
    principal,
    initialRate,
    fixedYears,
  );
  const paymentsMadeDuringFixedPeriod =
    fixedRateMonthlyPayment * (fixedYears * paymentsPerYear);

  const paymentsMade = fixedYears * paymentsPerYear;
  const remainingPrincipal = calculateRemainingBalance(
    principal,
    initialRate,
    totalYears,
    paymentsMade,
  );

  const yearsElapsed = totalYears - fixedYears;
  const adjustedRate = calculateAdjustedRate(
    initialRate,
    indexRate,
    margin,
    caps,
    indexRateRise,
    yearsElapsed,
  );
  const adjustableRateMonthlyPayment = calculateFixedRateMonthlyPayment(
    remainingPrincipal,
    adjustedRate,
    yearsElapsed,
  );
  const paymentsMadeDuringAdjustablePeriod =
    adjustableRateMonthlyPayment * (yearsElapsed * paymentsPerYear);

  const totalCost =
    paymentsMadeDuringFixedPeriod + paymentsMadeDuringAdjustablePeriod;

  return totalCost;
}
function calculateTotalMortgageCost(
  principal,
  annualRate,
  loanTermYears,
  loanType,
  paymentFrequency,
) {
  if (loanType === 'Fixed') {
    return calculateTotalFixedMortgageCost(
      principal,
      annualRate,
      loanTermYears,
    );
  } else if (loanType === 'Adjustable') {
    return calculateTotalAdjustableRateMortgageCost(
      principal,
      annualRate,
      loanTermYears,
      paymentFrequency,
    );
  } else {
    throw new Error('Unsupported loan type');
  }
}

function calculateDifference(item1, item2) {
  const difference = item1 - item2;
  return difference.toFixed(2);
}
