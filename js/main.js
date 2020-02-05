'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAX_PRICE = 0;
var MIN_PRICE = 1000000;

var MIN_MAP_HIGHT = 130;
var MAX_MAP_HIGHT = 630;
var mapWidth = document.querySelector('.map__overlay').offsetWidth;

var MAX_ARRAY_LENGTH_OF_PINS = 8;

var PIN_HEIGHT = 50;
var PIN_WIDTH = 70;

var MAIN_PIN_HEIGHT = 156;
var MAIN_PIN_WIDTH = 156;


// Возвращает рандомное число в диапазоне между параметрами min и max включительно.
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Возвращает один рандомный элемент из переданного массива.
var getRandomFromArray = function (array) {
  var randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};


// Возвращает массив случайной длинны от 1 до длинны массива включительно.
var getRandomArrayFromArray = function (array) {
  var maxLength = getRandomNumber(1, array.length + 1);
  return array.slice(0, maxLength);
};


// Создаёт массив переданной длинны из объекта объявления.
var getAdsArray = function () {
  var adsArray = [];
  for (var i = 0; i < MAX_ARRAY_LENGTH_OF_PINS; i++) {
    var ad = createAd(i);
    adsArray.push(ad);
  }
  return adsArray;
};

// Создаёт объект объявление с переданным индексом
var createAd = function (i) {
  var locationX = getRandomNumber(0, mapWidth);
  var locationY = getRandomNumber(MIN_MAP_HIGHT, MAX_MAP_HIGHT);

  return {
    author: {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      'title': 'string',
      'address': locationX + ', ' + locationY,
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
var renderPins = function () {
  // var map = document.querySelector('.map');

  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinListElement = document.querySelector('.map__pins');

  // создаём фрагмент куда будем записывать объявления
  var fragment = document.createDocumentFragment();

  // копируем по ссылке массив объявлений
  var ads = getAdsArray();

  // Клонируем темплейт объявления
  for (var i = 0; i < ads.length; i++) {
    var pinElement = template.cloneNode(true);
    var ad = ads[i];
    pinElement.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (ad.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    // Записываем объявления во фрагмент
    fragment.appendChild(pinElement);
  }

  // Вставляем фрагмент в .map__pins
  pinListElement.appendChild(fragment);

  // Показывает карту
  // map.classList.remove('map--faded');
};
renderPins();


// Новое задание /////////////////////////////////////////////////////////////////

// 1) Неактивное состояние.


var fieldsets = document.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var map = document.querySelector('.map');

var addFormDisabled = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
};
addFormDisabled();

var addMapDisabled = function () {
  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled', 'disabled');
  }
};
addMapDisabled();

var removeFormDisabled = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
};

// 2) Переводит страницу в активный режим.
var removeMapDisabled = function () {
  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = false;
  }
};

var mapPinMain = document.querySelector('.map__pin--main');

var onMainPinMousedown = function (evt) {
  mapPinMain.addEventListener('mousedown', onMainPinMousedown);
  if (evt.which === 1) {
    adForm.classList.remove('ad-form--disabled');
    // mapFaded.classList.remove(.map--faded )
    map.classList.remove('map--faded');
    removeFormDisabled();
    removeMapDisabled();
  }
};

var onMainPinEnter = function (evt) {
mapPinMain.addEventListener('keydown', function (evt)
  if (evt.key === 'Enter') {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeFormDisabled();
    removeMapDisabled();
  }}
};

// mapPinMain.addEventListener('mousedown', onMainPinMousedown);


// onMainPinMousedown


// var onPopupEscPress = function (evt) {
//   if (evt.key === ESC_KEY) {
//     closePopup();
//   }
// };


// 3) Заполнение поля адреса при mousedown на mapPinMain
// Формат значения поля адреса: {{x}}, {{y}}, где {{x}} и {{y}} это координаты,
// на которые метка указывает своим острым концом. Например, если метка .map__pin--main
// имеет CSS-координаты top: 200px; left: 300px, то в поле адрес должно быть записано
// значение 300 + расстояние до острого конца по горизонтали, 200 + расстояние до острого конца по вертикали.
//  Координаты не должны быть дробными.


// 5) Валидация
// Поле Цена за ночь:
// Обязательное поле;
// Числовое поле;
// Максимальное значение — 1000000.
// 3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
// «Бунгало» — минимальная цена за ночь 0; min="0"
// «Квартира» — минимальная цена за ночь 1 000; min="1000"
// «Дом» — минимальная цена 5 000; min="5000"
// «Дворец» — минимальная цена 10 000. min="10000"

// Валидация
// Второй подход заключается в использовании встроенного API для валидации.
// Вы пишите код проверки соответствия и если выбранное количество гостей не
// подходит под количество комнат, вызываете метод setCustomValidity.
// selectElt.setCustomValidity(string);

// {/* <label>Feeling: <input name=f type="text" oninput="check(this)"></label>
// <script>
//  function check(input) {
//    if (input.value == "good" ||
//        input.value == "fine" ||
//        input.value == "tired") {
//      input.setCustomValidity('"' + input.value + '" is not a feeling.');
//    } else {
//      // input is fine -- reset the error message
//      input.setCustomValidity('');
//    }
//  }
// </script> */}
