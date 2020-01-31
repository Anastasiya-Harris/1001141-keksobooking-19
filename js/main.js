'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var MAX_PRICE =;
var MIN_PRICE = ;


var locationX =  "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
var locationY = getRandomNumber(130, 630);



// Функция, возвращающая рандомное число в диапазоне между параметрами min и max.
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

// Функция, возвращающая один рандомный элемент из переданного массива.
var getRandomFromArray = function () {
  var randomFromArray = getRandomNumber(0, array.length)??????
  return array.randomFromArray;
  //var rand = myArray[Math.floor(Math.random() * myArray.length)];
};


var author {
  'avatar': 'img/avatars/user0' + (i + 1) + '.png'
};
"avatar": img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },


var offer = {
  'title': 'string',
  // 'address': строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
  'price':  getRandomNumber(MIN_PRICE, MAX_PRICE),
  'type':  [palace, flat, house или bungalo], //строка с одним из четырёх фиксированных значений:
  'rooms': number,
  'guests': number,
  'checkin': CHECKINS,
  'checkout': CHECKOUTS,
  'features': getRandomFromArray(FUTURES),
  'description': 'строка с описанием',
  'photos': getRandomFromArray(PHOTOS)
  },

    // "location": {
    // "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    // "y": случайное число, координата y метки на карте от 130 до 630.
    // }
// }

//Напишите функцию для создания массива из 8 сгенерированных JS объектов
// функцию генерации Случайных данных,
// функцию создания DOM-элемента на основе JS-объекта,
// функцию заполнения блока DOM-элементами на основе массива JS-объектов массив
var map = document.querySelector('.map');
map.classList.remove('map--faded');
