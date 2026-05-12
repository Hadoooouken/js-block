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
const allCheckbox = document.querySelectorAll('input[type=checkbox]');
const totalCountScreens = allInputs[1];
const totalCountOther = allInputs[2];
const totalFullCount = allInputs[3];
const totalCountRollback = allInputs[4];
let screens = document.querySelectorAll('.screen');
let inputs = document.querySelectorAll('input[type=text]');
let selects = document.querySelectorAll('select');
const controlItem = document.querySelector('.cms');
const checkboxCms = controlItem.querySelector('#cms-open');
const hiddenCms = controlItem.querySelector('.hidden-cms-variants');
const inputCms = hiddenCms.querySelector('.main-controls__input');

const select = hiddenCms.querySelector('#cms-select');

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
  cmsValue: 0,

  init: function () {
    this.addTitle();
    this.validationInputAndSelect();
    document.addEventListener('input', this.validationInputAndSelect.bind(this));
    rangeInput.addEventListener('input', this.rangeFunc.bind(this));
    startButton.addEventListener('click', this.start.bind(this));
    plusButton.addEventListener('click', this.addScreenBlock.bind(this));
    resetButton.addEventListener('click', this.reset.bind(this));
    select.addEventListener('change', () => {
      select.value === 'other'
        ? (inputCms.style.display = 'flex')
        : (inputCms.style.display = 'none');
      if (select.value === '50') {
        this.cmsValue = +select.value;
      }
    });

    checkboxCms.addEventListener('click', () => {
      checkboxCms.checked ? (hiddenCms.style.display = 'flex') : (hiddenCms.style.display = 'none');
    });
  },

  disableInputs: function () {
    selects = document.querySelectorAll('select');
    inputs = document.querySelectorAll('input[type=text]');
    startButton.style.display = 'none';
    resetButton.style.display = 'block';
    inputs.forEach((input) => {
      input.disabled = true;
    });
    selects.forEach((select) => {
      select.disabled = true;
    });
  },

  enableInputs: function () {
    startButton.style.display = 'block';
    resetButton.style.display = 'none';
    inputs.forEach((input) => {
      input.disabled = false;
      input.value = '';
    });
    selects.forEach((select) => {
      select.disabled = false;
      select.value = '';
    });
  },

  resetData: function () {
    this.title = '';
    this.screens = [];
    this.screenPrice = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.screensTotalCount = 0;
    this.isCalculated = false;
    this.cmsValue = 0;
    rangeInput.value = 0;
    rangeValue.textContent = '0%';

    screens.forEach((screen, i) => {
      if (i > 0) screen.remove();
    });
    allCheckbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
    hiddenCms.style.display = 'none';
  },

  rangeFunc: function () {
    console.log('THIS:', this);
    const rangePercent = rangeInput.value;

    rangeValue.textContent = `${rangePercent}%`;
    this.rollback = +rangePercent;

    if (this.isCalculated) {
      this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * this.rollback) / 100);
      totalCountRollback.value = this.servicePercentPrice;
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
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCountScreens.value = this.screensTotalCount;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        count: +input.value,
        price: +select.value * +input.value,
      });
    });
    console.log(this.screens);
  },

  addServices: function () {
    itemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    itemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
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
    this.screenPrice = this.screens.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    this.screensTotalCount = this.screens.reduce((acc, item) => {
      return acc + item.count;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * this.rollback) / 100);
  },

  isText: function (text) {
    const re = /^(?!\d+$).+/;
    return re.test(text.trim());
  },

  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this);
  },

  reset: function () {
    console.log('reset');
    this.enableInputs();
    this.resetData();
  },

  start: function () {
    console.log('start');
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.isCalculated = true;
    this.logger();
    console.log(this);
    this.showResult();
    this.disableInputs();
  },
};

appData.init();
