const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = appData.getTitle(prompt('Как называется ваш проект?', 'Калькулятор верстки'));
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');

        do {
            appData.screenPrice = +prompt('Сколько будет стоить данная работа');
        } while (!appData.isNumber(appData.screenPrice));

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    getRollbackMessage: (price) => {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price >= 15000 && price <= 30000) {
            return 'Даем скидку в 5%';
        } else if (price < 15000 && price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },

    getServicePercentPrices: function (price, numB) {
        return price - (price * numB) / 100;
    },

    getAllServicePrices: function () {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }
            let promptValue;
            do {
                promptValue = prompt('Сколько это будет стоить ?');
            } while (!appData.isNumber(promptValue));
            sum += +promptValue;
        }
        return sum;
    },
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getTitle: function (title) {
        const trimTitle = title.trim();
        const correctTitle = trimTitle[0].toUpperCase() + trimTitle.slice(1).toLowerCase();
        return correctTitle;
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData);

        for (let key in appData) {
            console.log(key, appData[key]);
        }
    },

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = Math.ceil(
            appData.getServicePercentPrices(appData.fullPrice, appData.rollback),
        );
        appData.logger();
    },
};

appData.start();
