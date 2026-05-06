const title = document.getElementsByTagName('h1').title;
const startButton = document.getElementsByClassName('handler_btn').start;
const resetButton = document.getElementsByClassName('handler_btn').reset;
const plusButton = document.querySelector('.screen-btn');
const itemsPercent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback input[type=range]');
const rangeValue = document.querySelector('.rollback .range-value');
const allInputs = document.getElementsByClassName('total-input');
const total = allInputs[0];
const totalCountScreens = allInputs[1];
const totalCountOther = allInputs[2];
const totalFullCount = allInputs[3];
const totalCountRollback = allInputs[4];
let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  screensTotalCount: 0,
  isCalculated: false,

  init: function () {
    appData.addTitle();
    appData.validationInputAndSelect();
    document.addEventListener('input', appData.validationInputAndSelect);
    document.addEventListener('change', appData.validationInputAndSelect);
    rangeInput.addEventListener('input', appData.rangeFunc);
    startButton.addEventListener('click', appData.start);
    plusButton.addEventListener('click', appData.addScreenBlock);
  },

  rangeFunc: function () {
    const rangePercent = rangeInput.value;

    rangeValue.textContent = `${rangePercent}%`;
    appData.rollback = +rangePercent;

    if (appData.isCalculated) {
      appData.servicePercentPrice = Math.ceil(
        appData.fullPrice - (appData.fullPrice * appData.rollback) / 100,
      );
      totalCountRollback.value = appData.servicePercentPrice;
    }
  },

  validationInputAndSelect: function () {
    let isDisabled = false;
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if (!select.value || !input.value) {
        startButton.style.opacity = '0.5';
        isDisabled = true;
      } else {
        startButton.style.opacity = '1';
        isDisabled = false;
      }
    });

    startButton.disabled = isDisabled;
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCountScreens.value = appData.screensTotalCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value,
      });
    });
    console.log(appData.screens);
  },

  addServices: function () {
    itemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);

    console.log(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    appData.screensTotalCount = appData.screens.reduce((acc, item) => {
      return acc + item.count;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - (appData.fullPrice * appData.rollback) / 100,
    );
  },

  isText: function (text) {
    const re = /^(?!\d+$).+/;
    return re.test(text.trim());
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData);
  },

  start: function () {
    console.log('start');
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.isCalculated = true;
    appData.logger();
    console.log(appData);
    appData.showResult();
  },
};

appData.init();
