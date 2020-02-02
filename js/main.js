'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAX_PRICE = 1000;
var MIN_PRICE = 100000;

// Показывает карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');


// Функция, возвращающая рандомное число в диапазоне между параметрами min и max.
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};


// Функция, возвращающая один рандомный элемент из переданного массива.
var getRandomFromArray = function () {
  var randomFromArray = getRandomNumber(0, array.length)
  return array.randomFromArray;
  //var rand = myArray[Math.floor(Math.random() * myArray.length)];
};

// Функция, для создания массива из 8 сгенерированных объявлений.
var createAds = function () {
  var author = {
    'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    // "avatar": img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  };

  var ads = {
    'title': 'string',
    // 'address': строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
    'type': getRandomFromArray(TYPE),
    'rooms': number,
    'guests': number,
    'checkin': CHECKINS,
    'checkout': CHECKOUTS,
    'features': getRandomFromArray(FUTURES),
    'description': 'строка с описанием',
    'photos': getRandomFromArray(PHOTOS)
  };

    var location = {
      x: getRandomNumber(0, 1138),
      y: getRandomNumber(130, 630)
  };
};

// Вставляет шабон на карту
var map = document.querySelectorAll('.map');

var template = document.querySelector('#card').content.querySelector('.map__card');

for (var i = 0; i < 8; i++) {
  var element = template.cloneNode(true);
  element.children[0].textContent = i;
  map[1].appendChild(element);
}
