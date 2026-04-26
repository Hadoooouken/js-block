const title = document.getElementsByTagName('h1').title
const startButton = document.getElementsByClassName('handler_btn').start
const resetButton = document.getElementsByClassName('handler_btn').reset
const plusButton = document.querySelector('.screen-btn')
const itemsPercent = document.querySelectorAll('.other-items.percent')
const itemsNumber = document.querySelectorAll('.other-items.number')
const rangeInput = document.querySelector('.rollback input[type=range]')
const rangeValue = document.querySelector('.rollback .range-value')
const allInputs = document.getElementsByClassName('total-input')
const total = allInputs[0];
const totalCount = allInputs[1];
const totalCountOther = allInputs[2];
const totalFullCount = allInputs[3];
const totalCountRollback = allInputs[4];
let screen = document.querySelectorAll('.screen')


// const appData = {
//     title: '',
//     screens: [],
//     screenPrice: 0,
//     adaptive: true,
//     rollback: 10,
//     allServicePrices: 0,
//     fullPrice: 0,
//     servicePercentPrice: 0,
//     services: {},

//     asking: function () {
//         let string
//         do {
//             string = prompt('Как называется ваш проект?',);
//         } while (!appData.isText(string))

//         appData.title = string

//         for (let i = 0; i < 2; i++) {
//             let name
//             let price = 0;

//             do {
//                 name = prompt('Какие типы экранов нужно разработать?');
//             } while (!appData.isText(name))
         
//                 do {
//                 price = +prompt('Сколько будет стоить данная работа');
//             } while (!appData.isNumber(price));

//             appData.screens.push({ id: i, name: name, price: price })
//         }



//         for (let i = 0; i < 2; i++) {

//             let promptValue = 0;
//             let name

//             do {
//                 name = prompt('Какой дополнительный тип услуги нужен?');
//             } while (!appData.isText(name))
                
//                 do {
//                 promptValue = prompt('Сколько это будет стоить ?');
//             } while (!appData.isNumber(promptValue));
//             appData.services[`${name}_${i}`] = +promptValue;
//         }

//         appData.adaptive = confirm('Нужен ли адаптив на сайте?');
//     },

//     addPrices: function () {
//         appData.screenPrice = appData.screens.reduce((acc, item) => {
//             return acc + item.price;
//         }, 0)

//         for (let key in appData.services) {
//             appData.allServicePrices += appData.services[key];
//         }
//     },

//     getRollbackMessage: (price) => {
//         if (price >= 30000) {
//             return 'Даем скидку в 10%';
//         } else if (price >= 15000 && price <= 30000) {
//             return 'Даем скидку в 5%';
//         } else if (price < 15000 && price >= 0) {
//             return 'Скидка не предусмотрена';
//         } else {
//             return 'Что то пошло не так';
//         }
//     },

//     getServicePercentPrices: function () {
//         appData.servicePercentPrice = Math.ceil(
//             appData.fullPrice - (appData.fullPrice * appData.rollback) / 100,
//         );
//     },

//     getFullPrice: function () {
//         appData.fullPrice = appData.screenPrice + appData.allServicePrices;
//     },

//     isNumber: function (num) {
//         return !isNaN(parseFloat(num)) && isFinite(num);
//     },

//     isText: function (text) {
//         const re = /^(?!\d+$).+/
//         return re.test(text.trim());
//     },

//     getTitle: function () {
//         const trimTitle = appData.title.trim();
//         const correctTitle = trimTitle[0].toUpperCase() + trimTitle.slice(1).toLowerCase();
//         appData.title = correctTitle;
//     },

//     logger: function () {
//         console.log(appData.fullPrice);
//         console.log(appData.servicePercentPrice);
//         console.log(appData);

//         for (let key in appData) {
//             console.log(key, appData[key]);
//         }

//         console.log(appData.services);
//     },

//     start: function () {
//         appData.asking();
//         appData.getTitle();
//         appData.getFullPrice();
//         appData.getServicePercentPrices();
//         appData.addPrices()
//         appData.logger();
//     },
// };

// appData.start();
