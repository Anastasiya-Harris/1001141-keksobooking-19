'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAX_PRICE = 1000;
var MIN_PRICE = 100000;

var MIN_MAP_HIGHT = 130;
var MAX_MAP_HIGHT = 630
var mapWidth = document.querySelector('.map__overlay').offsetWidth;

var MAX_ARRAY_LENGTH_OF_PINS = 8;

var PIN_HEIGHT = 50;
var PIN_WIDTH = 70;


// Возвращает рандомное число в диапазоне между параметрами min и max включительно.
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Возвращает один рандомный элемент из переданного массива.
var getRandomFromArray = function (array) {
  var randomFromArray = getRandomNumber(0, array.length - 1)
  return array[randomFromArray];
};


// Возвращает массив случайной длинны от 1 до длинны массива включительно.
var getRandomArrayFromArray = function (array) {
  var maxLength = getRandomNumber(1, array.length + 1);
  return array.slice(0, maxLength);
}


// Создаёт массив переданной длинны из объекта объявления.
var getAdsArray = function() {
  var adsArray = [];
  for (var i = 0; i < MAX_ARRAY_LENGTH_OF_PINS; i++) {
    var ad = createAds(i);
    adsArray.push(ad);
  }
  return adsArray;
};

// Создаёт объект объявление с переданным индексом
var createAds = function (i) {
  var locationX = getRandomNumber(0, mapWidth);
  var locationY = getRandomNumber(MIN_MAP_HIGHT, MAX_MAP_HIGHT);

  return {
    author: {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      'title': 'string',
      'address': locationX + ', '+ locationY,
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': getRandomFromArray(TYPE),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': getRandomFromArray(CHECKINS),
      'checkout': getRandomFromArray(CHECKOUTS),
      'features': getRandomArrayFromArray(FEATURES),
      'description': 'строка с описанием',
      'photos': getRandomArrayFromArray(PHOTOS),
    },

    location: {
      x: locationX,
      y: locationY
    }
  };
};

// Отрисовывает во фрагменте сгенерированные DOM элементы в блок .map__pin
var renderPins = function() {
  var map = document.querySelector('.map');

  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

  // создаём фрагмент куда будем записывать объявления
  var fragment = document.createDocumentFragment();

  // копируем по ссылке массив объявлений
  var ads = getAdsArray();

  // Клонируем темплейт объявления
  for (var i = 0; i < ads.length; i++ ) {
    var pinElement = template.cloneNode(true);
    var ad = ads[i];
    pinElement.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (ad.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    fragment.appendChild(pinElement);
  }

  // Записываем объявления во фрагмент и вставляем в .map__pins
  pinListElement.appendChild(fragment);

  // Показывает карту
  map.classList.remove('map--faded');
}
renderPins();
