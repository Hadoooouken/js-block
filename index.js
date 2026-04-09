const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа');
const adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить ?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить ?');

const rollback = 90;

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
const fullPrice = getFullPrice(screenPrice, allServicePrices);
const servicePercentPrice = Math.ceil(getServicePercentPrices(fullPrice, rollback));

const showTypeOff = (data) => {
    console.log(data, typeof data);
};


function getFullPrice(price, sidePrice) {
    return price + sidePrice;
}

const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
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

showTypeOff(title)
showTypeOff(screenPrice)
showTypeOff(adaptive)
console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
