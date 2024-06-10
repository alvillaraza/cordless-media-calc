import { setData, getData } from './data.js';
var gotRates = false;
var rates;

//Adds commas to number
export function FormatNum(yourNumber) {
  var n = yourNumber.toString().split('.');
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return n.join('.');
}

export function monthlyPayment(p, n, i) {
  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

export function getTermLengthForLoanType(loanType) {
  if (
    loanType == '30 Year Fixed' ||
    loanType == '7/1 ARM' ||
    loanType == '5/1 ARM' ||
    loanType == '10/1 ARM'
  ) {
    return 30;
  } else if (loanType == '20 Year Fixed') {
    return 20;
  } else if (loanType == '15 Year Fixed') {
    return 15;
  } else if (loanType == '10 Year Fixed') {
    return 10;
  }
}

export var usdFormatterPoints = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 3,
});

export var usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export var usdFormatterNoDec = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export function cmTrimNum(num, places, rounding) {
  rounding != 'floor' && rounding != 'ceil'
    ? (rounding = 'round')
    : (rounding = rounding);
  var result;
  var multiplier = Math.pow(10, places);
  result = Math[rounding](num * multiplier) / multiplier;
  return Number(result);
}

export function getRates($, callback) {
  if (gotRates) {
    callback(rates);
    return;
  }
  var requestBody = {
    creditScore: 800,
  };
  var rateTableApiUrl = 'https://rates-mtg.cordlessmedia.com/credit/all-rates';
  $.ajax({
    url: rateTableApiUrl,
    type: 'POST',
    data: JSON.stringify(requestBody),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      gotRates = true;
      rates = data;
      callback(data);
      // updateRateData($, data);
      // for (var i = 0; i < data.length; i++) {
      //     if (data[i].loanType == "30 Year Fixed") {
      //         $('#cmDcInterestRate').val(data[i].rate);
      //     }
      // }
      // calc($);
      // drawChart();
    },
  });
}

export function formatZip(zip) {
  if ('string' == typeof zip) {
    if (zip.length == 5) {
      return zip;
    }

    zip = zip.trim();
    if (zip.indexOf('-') >= 0) {
      zip = zip.substr(0, zip.indexOf('-')).trim();
    }
    return zip;
  }
}

export function getState(e) {
  if ('string' == typeof e && 5 === e.length) {
    var A,
      e = parseInt(e, 10);
    35e3 <= e && e <= 36999
      ? (A = 'AL')
      : 99500 <= e && e <= 99999
      ? (A = 'AK')
      : 85e3 <= e && e <= 86999
      ? (A = 'AZ')
      : 71600 <= e && e <= 72999
      ? (A = 'AR')
      : 9e4 <= e && e <= 96699
      ? (A = 'CA')
      : 8e4 <= e && e <= 81999
      ? (A = 'CO')
      : 6e3 <= e && e <= 6999
      ? (A = 'CT')
      : 19700 <= e && e <= 19999
      ? (A = 'DE')
      : 32e3 <= e && e <= 34999
      ? (A = 'FL')
      : 3e4 <= e && e <= 31999
      ? (A = 'GA')
      : 96700 <= e && e <= 96999
      ? (A = 'HI')
      : 83200 <= e && e <= 83999
      ? (A = 'ID')
      : 6e4 <= e && e <= 62999
      ? (A = 'IL')
      : 46e3 <= e && e <= 47999
      ? (A = 'IN')
      : 5e4 <= e && e <= 52999
      ? (A = 'IA')
      : 66e3 <= e && e <= 67999
      ? (A = 'KS')
      : 4e4 <= e && e <= 42999
      ? (A = 'KY')
      : 7e4 <= e && e <= 71599
      ? (A = 'LA')
      : 3900 <= e && e <= 4999
      ? (A = 'ME')
      : 20600 <= e && e <= 21999
      ? (A = 'MD')
      : 1e3 <= e && e <= 2799
      ? (A = 'MA')
      : 48e3 <= e && e <= 49999
      ? (A = 'MI')
      : 55e3 <= e && e <= 56999
      ? (A = 'MN')
      : 38600 <= e && e <= 39999
      ? (A = 'MS')
      : 63e3 <= e && e <= 65999
      ? (A = 'MO')
      : 59e3 <= e && e <= 59999
      ? (A = 'MT')
      : 27e3 <= e && e <= 28999
      ? (A = 'NC')
      : 58e3 <= e && e <= 58999
      ? (A = 'ND')
      : 68e3 <= e && e <= 69999
      ? (A = 'NE')
      : 88900 <= e && e <= 89999
      ? (A = 'NV')
      : 3e3 <= e && e <= 3899
      ? (A = 'NH')
      : 7e3 <= e && e <= 8999
      ? (A = 'NJ')
      : 87e3 <= e && e <= 88499
      ? (A = 'NM')
      : 1e4 <= e && e <= 14999
      ? (A = 'NY')
      : 43e3 <= e && e <= 45999
      ? (A = 'OH')
      : 73e3 <= e && e <= 74999
      ? (A = 'OK')
      : 97e3 <= e && e <= 97999
      ? (A = 'OR')
      : 15e3 <= e && e <= 19699
      ? (A = 'PA')
      : 300 <= e && e <= 999
      ? (A = 'PR')
      : 2800 <= e && e <= 2999
      ? (A = 'RI')
      : 29e3 <= e && e <= 29999
      ? (A = 'SC')
      : 57e3 <= e && e <= 57999
      ? (A = 'SD')
      : 37e3 <= e && e <= 38599
      ? (A = 'TN')
      : (75e3 <= e && e <= 79999) || (88500 <= e && e <= 88599)
      ? (A = 'TX')
      : 84e3 <= e && e <= 84999
      ? (A = 'UT')
      : 5e3 <= e && e <= 5999
      ? (A = 'VT')
      : 22e3 <= e && e <= 24699
      ? (A = 'VA')
      : 2e4 <= e && e <= 20599
      ? (A = 'DC')
      : 98e3 <= e && e <= 99499
      ? (A = 'WA')
      : 24700 <= e && e <= 26999
      ? (A = 'WV')
      : 53e3 <= e && e <= 54999
      ? (A = 'WI')
      : 82e3 <= e && e <= 83199
      ? (A = 'WY')
      : (A = 'none');
    return A;
  }
}

class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }

  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(
      this.b
    )})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.14,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(
      this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]
    );
    const newG = this.clamp(
      this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]
    );
    const newB = this.clamp(
      this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]
    );
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = (lossDiff / (2 * ck)) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + (value % max);
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `filter: invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(
      2
    )}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(
      5
    )}%);`;
  }
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

var hexToFilterMap = {};

export function setSvgColor($, identifier, hexColor, prop) {
  if (!hexToFilterMap[hexColor]) {
    const rgb = hexToRgb(hexColor);
    if (rgb.length !== 3) {
      return;
    }

    var lossMsg;
    var runAgain = false;
    var color;
    var solver;
    var result;

    do {
      color = new Color(rgb[0], rgb[1], rgb[2]);
      solver = new Solver(color);
      result = solver.solve();

      if (result.loss < 1) {
        runAgain = false;
        lossMsg = 'This is a perfect result.';
      } else if (result.loss < 5) {
        runAgain = false;
        lossMsg = 'The is close enough.';
      } else if (result.loss < 15) {
        runAgain = false;
        lossMsg = 'The color is somewhat off. Consider running it again.';
      } else {
        runAgain = true;
        lossMsg = 'The color is extremely off. Run it again!';
      }

      hexToFilterMap[hexColor] = result;
    } while (runAgain);
  }

  if (prop == 'id') {
    $('#' + identifier).attr('style', hexToFilterMap[hexColor].filter);
  } else {
    $('.' + identifier).attr('style', hexToFilterMap[hexColor].filter);
  }
}

export function createJsTracker(trackingString) {
  if (window.location.hostname.indexOf('localhost') < 0) {
    var trackingEl = document.createElement('script');
    trackingEl.src = trackingString;
    trackingEl.setAttribute('language', 'JavaScript1.1');
    document.body.appendChild(trackingEl);
  }
}

export function createIframeTracker(trackingString) {
  if (window.location.hostname.indexOf('localhost') < 0) {
    var trackingEl = document.createElement('iframe');
    trackingEl.src = trackingString;
    trackingEl.setAttribute('HEIGHT', '1');
    trackingEl.setAttribute('WIDTH', '1');
    trackingEl.setAttribute('MARGINWIDTH', '0');
    trackingEl.setAttribute('MARGINHEIGHT', '0');
    trackingEl.setAttribute('HSPACE', '0');
    trackingEl.setAttribute('VSPACE', '0');
    trackingEl.setAttribute('FRAMEBORDER', '0');
    trackingEl.setAttribute('SCROLLING', 'no');
    trackingEl.setAttribute('BORDERCOLOR', '#000000');
    document.body.appendChild(trackingEl);
  }
}

export function createPxl(trackingUrl) {
  if (window.location.hostname.indexOf('localhost') < 0) {
    var trackingEl = document.createElement('img');
    trackingEl.src = trackingUrl;
    trackingEl.setAttribute('BORDER', '0');
    trackingEl.setAttribute('HEIGHT', '0');
    trackingEl.setAttribute('WIDTH', '0');
    trackingEl.setAttribute('ALT', '');
    document.body.appendChild(trackingEl);
  }
}

var shouldResizeTopOffersDesktop = true;
var shouldResizeTopOffersTablet = true;
var shouldResizeTopOffersMobile = true;
var shouldResizeTopOffersMobileSmall = true;
var additionalServicesOffers = [];

export function setAdditionalServicesOffers(offers) {
  additionalServicesOffers = offers;
}

export function placeAdditionalServices($) {
  if (additionalServicesOffers.length == 0) {
    return;
  }
  var width =
    $('#cordless-widget-v1') && $('#cordless-widget-v1').width() != 0
      ? $('#cordless-widget-v1').width()
      : 320;
  $('#cordless-additional-services').empty();

  if (width >= 896) {
    shouldResizeTopOffersDesktop = false;
    $('#cm-additional-services-col').removeClass('col-12');
    $('#cm-additional-services-col').addClass('col-10');
    $('#cm-additional-services-col').addClass('offset-1');
    //4 across
    var cardCol = $('<div>', {
      class: 'col-10 offset-1',
      style: 'padding-bottom:10px;',
    });
    var cardDeck = $('<div>', { class: 'card-deck' });
    for (var i = 0; i < additionalServicesOffers.length; i++) {
      var card = $('<div>', { class: 'card' });
      var cardImgBody = $('<div>', { class: 'card-img-body' });
      var img = $('<img>', {
        class: 'card-img-top',
        src: additionalServicesOffers[i].img,
      });
      cardImgBody.append(img);
      card.append(cardImgBody);

      var cardBody = $('<div>', { class: 'card-body' });
      // var cardTitle = $("<h5>", {class: "card-title cm-card-title", text: additionalServicesOffers[i].title, style: "height:40px;"});
      var carBodyText = $('<p>', {
        class: 'card-text cm-card-text',
        text: additionalServicesOffers[i].body,
        style: 'height:60px;text-align:center;line-height:16.1px',
      });
      // var cardBodyLogo = $("<img>", {src: additionalServicesOffers[i].logo, class: "cm-card-offer-logo"});
      // cardBody.append(cardTitle);
      cardBody.append(carBodyText);
      // cardBody.append(cardBodyLogo);
      card.append(cardBody);

      var cardFooter = $('<div>', { class: 'card-footer' });
      var cardFooterCtaP = $('<p>', {
        class: 'cm-card-link',
        style: 'text-align:center',
      });
      var cardFooterCta = $('<a>', {
        target: '_blank',
        text: additionalServicesOffers[i].cta,
        href: additionalServicesOffers[i].href,
        class: 'stretched-link',
        style:
          'color:' +
          getData().offerButtonTextColor +
          ';background:' +
          getData().offerButtonColor +
          ';border-radius:' +
          getData().offerButtonBorderRadius +
          ';font-size:13px;',
      });
      cardFooterCtaP.append(cardFooterCta);
      cardFooter.append(cardFooterCtaP);
      card.append(cardFooter);

      cardDeck.append(card);
    }

    cardCol.append(cardDeck);

    $('#cordless-additional-services').append(cardCol);
  } else if (width >= 580) {
    $('#cm-additional-services-col').removeClass('col-12');
    $('#cm-additional-services-col').addClass('col-8');
    $('#cm-additional-services-col').addClass('offset-2');
    shouldResizeTopOffersTablet = false;
    //2 across

    var cardCol1 = $('<div>', {
      class: 'col-8 offset-2',
      style: 'padding-bottom:10px;',
    });
    var cardDeck1 = $('<div>', { class: 'card-deck' });
    var cardCol2 = $('<div>', {
      class: 'col-8 offset-2',
      style: 'padding-bottom:10px;',
    });
    var cardDeck2 = $('<div>', { class: 'card-deck' });
    for (var i = 0; i < 2; i++) {
      //todo nullsafe
      var card = $('<div>', { class: 'card' });
      var cardImgBody = $('<div>', { class: 'card-img-body' });
      var img = $('<img>', {
        class: 'card-img-top',
        src: additionalServicesOffers[i].img,
      });
      cardImgBody.append(img);
      card.append(cardImgBody);

      var cardBody = $('<div>', { class: 'card-body' });
      // var cardTitle = $("<h5>", {class: "card-title cm-card-title", text: additionalServicesOffers[i].title, style: "height:45px;"});
      var carBodyText = $('<p>', {
        class: 'card-text cm-card-text',
        text: additionalServicesOffers[i].body,
        style: 'height:65px;text-align:center;line-height:16.1px',
      });
      // var cardBodyLogo = $("<img>", {src: additionalServicesOffers[i].logo, class: "cm-card-offer-logo"});
      // cardBody.append(cardTitle);
      cardBody.append(carBodyText);
      // cardBody.append(cardBodyLogo);
      card.append(cardBody);

      var cardFooter = $('<div>', { class: 'card-footer' });
      var cardFooterCtaP = $('<p>', {
        class: 'cm-card-link',
        style: 'text-align:center',
      });
      var cardFooterCta = $('<a>', {
        target: '_blank',
        text: additionalServicesOffers[i].cta,
        href: additionalServicesOffers[i].href,
        class: 'stretched-link',
        style:
          'color:' +
          getData().offerButtonTextColor +
          ';background:' +
          getData().offerButtonColor +
          ';border-radius:' +
          getData().offerButtonBorderRadius +
          ';font-size:13px;',
      });
      cardFooterCtaP.append(cardFooterCta);
      cardFooter.append(cardFooterCtaP);
      card.append(cardFooter);

      cardDeck1.append(card);
    }

    for (var i = 2; i < additionalServicesOffers.length; i++) {
      //todo nullsafe
      var card = $('<div>', { class: 'card' });
      var cardImgBody = $('<div>', { class: 'card-img-body' });
      var img = $('<img>', {
        class: 'card-img-top',
        src: additionalServicesOffers[i].img,
      });
      cardImgBody.append(img);
      card.append(cardImgBody);

      var cardBody = $('<div>', { class: 'card-body' });
      // var cardTitle = $("<h5>", {class: "card-title cm-card-title", text: additionalServicesOffers[i].title, style: "height:45px;"});
      var carBodyText = $('<p>', {
        class: 'card-text cm-card-text',
        text: additionalServicesOffers[i].body,
        style: 'height:65px;text-align:center;line-height:16.1px',
      });
      // var cardBodyLogo = $("<img>", {src: additionalServicesOffers[i].logo, class: "cm-card-offer-logo"});
      // cardBody.append(cardTitle);
      cardBody.append(carBodyText);
      // cardBody.append(cardBodyLogo);
      card.append(cardBody);

      var cardFooter = $('<div>', { class: 'card-footer' });
      var cardFooterCtaP = $('<p>', {
        class: 'cm-card-link',
        style: 'text-align:center',
      });
      var cardFooterCta = $('<a>', {
        target: '_blank',
        text: additionalServicesOffers[i].cta,
        href: additionalServicesOffers[i].href,
        class: 'stretched-link',
        style:
          'color:' +
          getData().offerButtonTextColor +
          ';background:' +
          getData().offerButtonColor +
          ';border-radius:' +
          getData().offerButtonBorderRadius +
          ';font-size:13px;',
      });
      cardFooterCtaP.append(cardFooterCta);
      cardFooter.append(cardFooterCtaP);
      card.append(cardFooter);

      cardDeck2.append(card);
    }

    cardCol1.append(cardDeck1);
    cardCol2.append(cardDeck2);

    $('#cordless-additional-services').append(cardCol1);
    $('#cordless-additional-services').append(cardCol2);
  } else if (width >= 420) {
    $('#cm-additional-services-col').removeClass('col-10');
    $('#cm-additional-services-col').removeClass('offset-1');
    $('#cm-additional-services-col').addClass('col-12');
    shouldResizeTopOffersMobile = false;
    //1 across
    for (var i = 0; i < additionalServicesOffers.length; i++) {
      var cardCol = $('<div>', {
        class: 'col-12',
        style: 'padding-bottom:10px;',
      });
      var cardDeck = $('<div>', { class: 'card-deck' });
      var card = $('<div>', { class: 'card' });

      var cardRow = $('<div>', { class: 'row no-gutters' });

      var cardImgCol = $('<div>', {
        class: 'col-2',
        style: 'padding-left:10px;margin:auto',
      });
      var cardImg = $('<img>', {
        class: 'card-img-small',
        src: additionalServicesOffers[i].img,
      });
      cardImgCol.append(cardImg);
      cardRow.append(cardImgCol);

      var cardBodyCol = $('<div>', {
        class: 'col-6',
        style: 'padding-left:15px;margin:auto',
      });
      var cardBody = $('<div>', { class: 'card-body' });
      var carBodyText = $('<p>', {
        class: 'card-text cm-card-text',
        text: additionalServicesOffers[i].body,
        style: 'text-align:left;line-height:16.1px',
      });
      cardBody.append(carBodyText);
      cardBodyCol.append(cardBody);
      cardRow.append(cardBodyCol);

      var cardFooterCol = $('<div>', {
        class: 'col-4',
        style: 'margin:auto;position:unset;white-space:nowrap',
      });
      var cardFooter = $('<div>', { class: 'card-footer' });
      var cardFooterCtaP = $('<p>', { class: 'cm-card-link-small' });
      var cardFooterCta = $('<a>', {
        target: '_blank',
        text: additionalServicesOffers[i].cta,
        href: additionalServicesOffers[i].href,
        class: 'stretched-link',
        style:
          'color:' +
          getData().offerButtonTextColor +
          ';background:' +
          getData().offerButtonColor +
          ';border-radius:' +
          getData().offerButtonBorderRadius +
          ';font-size:11px!important;',
      });
      cardFooterCtaP.append(cardFooterCta);
      cardFooter.append(cardFooterCtaP);
      cardFooterCol.append(cardFooter);
      cardRow.append(cardFooterCol);

      card.append(cardRow);

      cardDeck.append(card);
      cardCol.append(cardDeck);
      $('#cordless-additional-services').append(cardCol);
    }
  } else {
    $('#cm-additional-services-col').removeClass('col-10');
    $('#cm-additional-services-col').removeClass('offset-1');
    $('#cm-additional-services-col').addClass('col-12');
    shouldResizeTopOffersMobileSmall = false;
    //1 across
    for (var i = 0; i < additionalServicesOffers.length; i++) {
      var cardCol = $('<div>', {
        class: 'col-12',
        style: 'padding-bottom:10px;',
      });
      var cardDeck = $('<div>', { class: 'card-deck' });
      var card = $('<div>', { class: 'card', style: 'margin-bottom:5px;' });

      var cardRow = $('<div>', { class: 'row no-gutters' });

      var cardImgCol = $('<div>', {
        class: 'col-1',
        style: 'padding-left:5px;margin:auto',
      });
      var cardImg = $('<img>', {
        class: 'card-img-xsmall',
        src: additionalServicesOffers[i].img,
      });
      cardImgCol.append(cardImg);
      cardRow.append(cardImgCol);

      var cardBodyCol = $('<div>', {
        class: 'col-6',
        style: 'padding-left:25px;margin:auto',
      });
      var cardBody = $('<div>', { class: 'card-body' });
      var carBodyText = $('<p>', {
        class: 'card-text cm-card-text-xsmall',
        text: additionalServicesOffers[i].body,
        style: 'text-align:left;line-height:16.1px',
      });
      cardBody.append(carBodyText);
      cardBodyCol.append(cardBody);
      cardRow.append(cardBodyCol);

      var cardFooterCol = $('<div>', {
        class: 'col-4',
        style: 'margin:auto;position:unset;white-space:nowrap',
      });
      var cardFooter = $('<div>', { class: 'card-footer-xsmall' });
      var cardFooterCtaP = $('<p>', { class: 'cm-card-link-xsmall' });
      var cardFooterCta = $('<a>', {
        target: '_blank',
        text: additionalServicesOffers[i].cta,
        href: additionalServicesOffers[i].href,
        class: 'stretched-link',
        style:
          'color:' +
          getData().offerButtonTextColor +
          ';background:' +
          getData().offerButtonColor +
          ';border-radius:' +
          getData().offerButtonBorderRadius +
          ';font-size:10px!important;',
      });
      cardFooterCtaP.append(cardFooterCta);
      cardFooter.append(cardFooterCtaP);
      cardFooterCol.append(cardFooter);
      cardRow.append(cardFooterCol);

      card.append(cardRow);

      cardDeck.append(card);
      cardCol.append(cardDeck);
      $('#cordless-additional-services').append(cardCol);
    }
  }
}

export function resizeAdditionalServices($) {
  var width =
    $('#cordless-widget-v1') && $('#cordless-widget-v1').width() != 0
      ? $('#cordless-widget-v1').width()
      : 320;
  if (width < 420 && shouldResizeTopOffersMobileSmall) {
    shouldResizeTopOffersDesktop = true;
    shouldResizeTopOffersTablet = true;
    shouldResizeTopOffersMobile = true;
    shouldResizeTopOffersMobileSmall = false;
    $('#cm-additional-services-col').removeClass('col-10');
    $('#cm-additional-services-col').removeClass('offset-1');
    $('#cm-additional-services-col').addClass('col-12');
    placeAdditionalServices($);
  } else if (width >= 420 && width < 580 && shouldResizeTopOffersMobile) {
    shouldResizeTopOffersDesktop = true;
    shouldResizeTopOffersTablet = true;
    shouldResizeTopOffersMobile = false;
    shouldResizeTopOffersMobileSmall = true;
    $('#cm-additional-services-col').removeClass('col-10');
    $('#cm-additional-services-col').removeClass('offset-1');
    $('#cm-additional-services-col').addClass('col-12');
    placeAdditionalServices($);
  } else if (width >= 580 && width < 896 && shouldResizeTopOffersTablet) {
    shouldResizeTopOffersDesktop = true;
    shouldResizeTopOffersTablet = false;
    shouldResizeTopOffersMobile = true;
    shouldResizeTopOffersMobileSmall = true;
    $('#cm-additional-services-col').removeClass('col-12');
    $('#cm-additional-services-col').addClass('col-8');
    $('#cm-additional-services-col').addClass('offset-2');
    placeAdditionalServices($);
  } else if (width >= 896 && shouldResizeTopOffersDesktop) {
    shouldResizeTopOffersDesktop = false;
    shouldResizeTopOffersTablet = true;
    shouldResizeTopOffersMobile = true;
    shouldResizeTopOffersMobileSmall = true;
    $('#cm-additional-services-col').removeClass('col-12');
    $('#cm-additional-services-col').addClass('col-10');
    $('#cm-additional-services-col').addClass('offset-1');
    placeAdditionalServices($);
  }
}

export function initQuinstreet(
  $,
  adUnitDetails,
  definedLink,
  cm_calc_params,
  tag,
  callback
) {
  var qsZip = cm_calc_params.zip ? cm_calc_params.zip : null;
  if (!qsZip) {
    qsZip = adUnitDetails.tctx['secondary-zip']
      ? adUnitDetails.tctx['secondary-zip']
      : '';
  }
  var requestBody = {
    tracking: {
      content_type: 'json',
      ni_ad_client: '662390',
      ni_zc: cm_calc_params.zip,
      ni_var1: cm_calc_params.pid + tag,
    },
  };
  var qsapi =
    window.location.host.indexOf('localhost') >= 0 ||
    window.location.host.indexOf('cordlessads') >= 0 ||
    !window.location.host
      ? 'https://nextinsure.quinstage.com/ListingDisplay/listings'
      : 'https://www.nextinsure.com/listingdisplay/listings';
  $.post(qsapi, JSON.stringify(requestBody), function (data) {
    callback($, data, adUnitDetails, definedLink);
    // var listingData = data.response.listingset.listing;
    // // homeInsLinkText
    // if (listingData.length > 0) {
    //     $("#homeInsLinkText").attr("href", listingData[0].clickurl);
    //     $("#homeInsLinkText").attr("cmData-adid", adUnitDetails.adid);
    //     $("#homeInsLinkText").click(getLinkClickHandler(definedLink, adUnitDetails))
    // } else {
    //     $("#cmPcHomeInsOfferCtr").empty();
    // }
  });
}

export function getObserverOptions() {
  return {
    root: null,
    rootMargin: '50px 0px',
    threshold: [0],
  };
}

export var deviceDetector = (function () {
  var ua = navigator.userAgent.toLowerCase();
  var detect = function (s) {
    if (s === undefined) s = ua;
    else ua = s.toLowerCase();
    if (
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        ua
      )
    )
      return 'tablet';
    else if (
      /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(
        ua
      )
    )
      return 'phone';
    else return 'desktop';
  };
  return {
    device: detect(),
    detect: detect,
    isMobile: detect() != 'desktop' ? true : false,
    userAgent: ua,
  };
})();

export function registerClick(
  event,
  definedLink,
  adUnitDetails,
  pubId,
  targetingArray
) {
  var adID = adUnitDetails.adid;
  var cts = Date.now();
  var targetingKeys = [];
  var targetingValues = [];
  var cid = adUnitDetails.cid;
  var pid = pubId;
  var pl = definedLink.placement;
  var crid = adUnitDetails.crid;
  var srctp = adUnitDetails.srctp;

  if (definedLink.targeting) {
    Object.keys(definedLink.targeting).forEach(function (key, index) {
      targetingKeys.push(key);
      targetingValues.push(definedLink.targeting[key]);
    });
  }

  for (var i = 0; i < targetingArray.length; i++) {
    targetingKeys.push(targetingArray[i][0]);
    targetingValues.push(targetingArray[i][1]);
  }

  var clickReqParams = {
    adid: adID,
    cts: cts,
    targetingKeys: targetingKeys,
    targetingValues: targetingValues,
    cid: cid,
    pid: pid,
    pl: pl,
    crid: crid,
    srctp: srctp,
  };

  var esc = encodeURIComponent;
  var query = Object.keys(clickReqParams)
    .map(function (k) {
      return esc(k) + '=' + esc(clickReqParams[k]);
    })
    .join('&');

  var cmLinkClickUrl = 'https://links.cordlessmedia.com/cmck?';
  var cmLinkClickUrl =
    window.location.hostname.indexOf('localhost') >= 0
      ? 'http://localhost:8080/cmck?'
      : 'https://links.cordlessmedia.com/cmck?';
  var cmClickRequest = cmLinkClickUrl + query;
  cmWdgtGetAsync(cmClickRequest);
}

export function setupLeadForm() {
  document.getElementById('cordless-lead-form').innerHTML = '';
  document.getElementById('cordless-lead-form-container').style.display =
    'block';
  registerClick(
    null,
    this.definedLinkObj,
    this.adUnitDetails,
    this.pid,
    this.targeting
  );
  var url = getLeadFormUrl(this.adUnitDetails, this.definedLinkObj);
  var lfIframe = document.createElement('iframe');
  lfIframe.id = 'cmlfel';
  lfIframe.src = url;
  lfIframe.setAttribute('frameborder', '0');
  lfIframe.setAttribute('scrolling', 'no');
  lfIframe.style.height = '500px';
  var containerWidth = document.getElementById(
    'cordless-lead-form-container'
  ).offsetWidth;
  if (containerWidth >= 490) {
    lfIframe.style.width = '490px';
  } else {
    lfIframe.style.width = containerWidth + 'px';
  }
  lfIframe.style.maxWidth = '500px';
  document.getElementById('cordless-lead-form').appendChild(lfIframe);
  document.getElementById('cordless-widget').style.display = 'none';
}

function cmWdgtGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      if (xmlHttp.responseText) {
        if (callback) {
          callback(xmlHttp.responseText);
        }
      }
    }
  };
  xmlHttp.open('GET', url, true); // true for asynchronous
  xmlHttp.send(null);
}

var leadFormUrlsByCampaignId = {
  7046: 'https://cdn.cordlessmedia.com/mortgage-center/lead-capture/v1/leadpoint/cmlfv1.html?border=none',
  7051: 'https://cdn.cordlessmedia.com/mortgage-center/lead-capture/v1/leadpoint/cmlfv1.html?border=none',
};

export function getLeadFormUrl(adUnitDetails, definedLinkObj) {
  var lfUrl = leadFormUrlsByCampaignId[adUnitDetails.cid];
  lfUrl += '&clickId=' + adUnitDetails.adid;
  lfUrl += '&placement=' + definedLinkObj.placement;
  lfUrl += '&publisherId=' + definedLinkObj.placement.substr(0, 5);
  lfUrl += '&zip=' + getData().zip;
  lfUrl += '&address=' + getData().address;
  lfUrl += '&city=' + getData().city;
  lfUrl += '&state=' + getData().state;
  lfUrl += '&price=' + getData().homePrice;
  lfUrl += '&downPayment=' + getData().downPayment;
  lfUrl += '&buttonColor=' + getData().offerButtonColor.substr(1);
  lfUrl += '&buttonTextColor=' + getData().offerButtonTextColor.substr(1);
  return lfUrl;
}
