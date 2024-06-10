var data = {
  zip: '',
  address: '',
  apt: '',
  state: '',
  city: '',
  homePrice: '',
  downPayment: '',
  downPaymentPerc: '',
  hoa: '',
  homeIns: '',
  propertyTaxPerc: '',
  latitude: '',
  longitude: '',
  rentalWidgetPropertyAddress: '',
  rentalWidgetPropertyAddress2: '',
  rentalWidgetPropertyCity: '',
  rentalWidgetPropertyState: '',
  rentalWidgetPropertyZip: '',
  rentalWidgetPropertyBeds: '',
  rentalWidgetPropertyBaths: '',
  rentalWidgetPropertyLat: '',
  rentalWidgetPropertyLong: '',
  rentalWidgetPropertyLocationPrompt: '',
  telcoWidgetAddress: '',
  telcoWidgetCity: '',
  telcoWidgetState: '',
  telcoWidgetZip: '',
  linksLoaded: false,
};

export function setData(field, value) {
  data[field] = value;
  return data;
}

export function getData() {
  return data;
}
