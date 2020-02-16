'use strict';
// data.js — модуль, который создаёт данные;
(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var MAX_PRICE = 1000000;
  var MIN_PRICE = 0;

  var MIN_MAP_HIGHT = 130;
  var MAX_MAP_HIGHT = 630;
  var mapWidth = document.querySelector('.map__overlay').offsetWidth;

  var MAX_ARRAY_LENGTH_OF_PINS = 8;

  // Создаёт массив переданной длинны из объекта объявления.
  window.getAdsArray = function () {
    var adsArray = [];
    for (var i = 0; i < MAX_ARRAY_LENGTH_OF_PINS; i++) {
      var ad = createAd(i);
      adsArray.push(ad);
    }
    return adsArray;
  };

  // Создаёт объект объявление с переданным индексом
  var createAd = function (i) {
    var locationX = window.utils.getRandomNumber(0, mapWidth);
    var locationY = window.utils.getRandomNumber(MIN_MAP_HIGHT, MAX_MAP_HIGHT);

    return {
      author: {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        'title': 'string',
        'address': locationX + ', ' + locationY,
        'price': window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': window.utils.getRandomFromArray(TYPE),
        'rooms': window.utils.getRandomNumber(1, 5),
        'guests': window.utils.getRandomNumber(1, 5),
        'checkin': window.utils.getRandomFromArray(CHECKINS),
        'checkout': window.utils.getRandomFromArray(CHECKOUTS),
        'features': window.utils.getRandomArrayFromArray(FEATURES),
        'description': 'строка с описанием',
        'photos': window.utils.getRandomArrayFromArray(PHOTOS),
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
  };
})();
