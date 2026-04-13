let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 90;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1
let service2

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
    title = getTitle(prompt('Как называется ваш проект?', 'Калькулятор верстки'));
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');


    do {
        screenPrice = +prompt('Сколько будет стоить данная работа');
    }
    while (!isNumber(screenPrice))

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOff = (data) => {
    console.log(data, typeof data);
};

function getFullPrice() {
    return screenPrice + allServicePrices;
}

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        let promptValue
        do {
            promptValue = prompt('Сколько это будет стоить ?')
        }

        while (!isNumber(promptValue));
        sum += +promptValue
    }
    return sum;
};

const getTitle = (title) => {
    const trimTitle = title.trim();
    const correctTitle = trimTitle[0].toUpperCase() + trimTitle.slice(1).toLowerCase();
    return correctTitle;
};

function getServicePercentPrices(price, numB) {
    return price - numB;
}

const getRollbackMessage = (price) => {
    if (price >= 30000) {
        return 'Даем скидку в 10%';
    } else if (price >= 15000 && price <= 30000) {
        return 'Даем скидку в 5%';
    } else if (price < 15000 && price >= 0) {
        return 'Скидка не предусмотрена';
    } else {
        return 'Что то пошло не так';
    }
};

asking();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = Math.ceil(getServicePercentPrices(fullPrice, rollback));

showTypeOff(title);
showTypeOff(screenPrice);
showTypeOff(adaptive);

console.log('allServicePrices', allServicePrices);
console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
